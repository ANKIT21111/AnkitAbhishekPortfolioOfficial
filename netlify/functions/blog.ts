import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { ObjectId } from 'mongodb';
import { getEmailTemplate, getBlogContent } from './utils/emailTemplates';

export const handler: Handler = async (event, context) => {
    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('posts');

        const verifyOtp = async (providedOtp: string | undefined) => {
            if (!providedOtp) return { valid: false, error: 'Missing OTP' };
            const otpCollection = db.collection('otps');
            const email = process.env.VITE_CONTACT_EMAIL;
            const otpRecord = await otpCollection.findOne({ email, otp: providedOtp });

            if (!otpRecord) return { valid: false, error: 'INVALID_OR_EXPIRED_OTP' };

            const now = new Date();
            const otpTime = new Date(otpRecord.createdAt);
            if (now.getTime() - otpTime.getTime() > 300000) {
                await otpCollection.deleteOne({ _id: otpRecord._id });
                return { valid: false, error: 'OTP_EXPIRED' };
            }

            await otpCollection.deleteOne({ _id: otpRecord._id });
            return { valid: true };
        };

        switch (event.httpMethod) {
            case 'GET': {
                const id = event.queryStringParameters?.id;

                if (id) {
                    const post = await collection.findOne({ _id: new ObjectId(id) });
                    if (!post) {
                        return { statusCode: 404, body: JSON.stringify({ error: 'Post not found' }) };
                    }
                    return {
                        statusCode: 200,
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            ...post,
                            id: post._id.toString()
                        }),
                    };
                }

                // Exclude content for list view to optimize performance
                const posts = await collection.find({}, { projection: { content: 0 } }).sort({ timestamp: -1 }).toArray();
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(posts.map((post: any) => ({
                        ...post,
                        id: post._id.toString()
                    }))),
                };
            }


            case 'POST': {
                const otp = event.queryStringParameters?.otp;
                const otpVerification = await verifyOtp(otp);
                if (!otpVerification.valid) {
                    return { statusCode: 401, body: JSON.stringify({ error: otpVerification.error }) };
                }

                if (!event.body) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing body' }) };
                }

                const newPost = JSON.parse(event.body);

                // Validation
                if (!newPost.title || !newPost.content) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing title or content' }) };
                }

                // Remove potential ID from frontend to let Mongo generate one
                const { id: _, _id: __, ...postData } = newPost;

                // Add timestamp if not present (though frontend sends it)
                const postToSave = {
                    ...postData,
                    timestamp: postData.timestamp || Date.now(),
                    date: postData.date || new Date().toISOString().split('T')[0],
                    time: postData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                const insertResult = await collection.insertOne(postToSave);

                // Notify Subscribers
                const subscribersCollection = db.collection('subscribers');
                const subscribers = await subscribersCollection.find({ active: true }).toArray();
                const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;

                if (scriptUrl && subscribers.length > 0) {
                    const blogUrl = `https://ankitabhishek.netlify.app/thoughts?id=${insertResult.insertedId.toString()}`;
                    
                    // Send individual emails to ensure personalized unsubscribe links
                    const notificationPromises = subscribers.map(async (subscriber: any) => {
                        const htmlMessage = getEmailTemplate(
                            getBlogContent(newPost.title, newPost.description, blogUrl),
                            `New Insight: ${newPost.title}`,
                            subscriber.email,
                            true // Enable unsubscribe link for blog posts
                        );

                        return fetch(scriptUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            body: JSON.stringify({
                                identifier: 'NEW_BLOG_POST',
                                email: 'system@portfolio.com',
                                message: htmlMessage,
                                subject: `Ankit Abhishek - New Post: ${newPost.title}`,
                                targetEmail: subscriber.email, // Send to individual email
                                timestamp: new Date().toISOString(),
                                isHtml: true
                            })
                        }).catch(err => console.error(`Failed to notify ${subscriber.email}:`, err));
                    });

                    // Wait for all notifications to be sent (with a timeout/safe handling if needed)
                    await Promise.all(notificationPromises);
                }

                return {
                    statusCode: 201,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...postToSave,
                        id: insertResult.insertedId.toString()
                    }),
                };
            }

            case 'PUT': {
                const otp = event.queryStringParameters?.otp;
                const otpVerification = await verifyOtp(otp);
                if (!otpVerification.valid) {
                    return { statusCode: 401, body: JSON.stringify({ error: otpVerification.error }) };
                }

                if (!event.body) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing body' }) };
                }

                const updateData = JSON.parse(event.body);
                const { id, _id: inputId, ...dataToUpdate } = updateData;

                const targetId = id || inputId;

                if (!targetId) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing ID' }) };
                }

                await collection.updateOne(
                    { _id: new ObjectId(targetId) },
                    { $set: dataToUpdate }
                );

                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'Updated successfully', id: targetId })
                };
            }

            case 'DELETE': {
                // Expect ID and OTP in query parameters: ?id=...&otp=...
                const deleteId = event.queryStringParameters?.id;
                const providedOtp = event.queryStringParameters?.otp;

                const otpVerification = await verifyOtp(providedOtp);
                if (!otpVerification.valid) {
                    return { statusCode: 401, body: JSON.stringify({ error: otpVerification.error }) };
                }

                if (!deleteId) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing ID' }) };
                }

                // Valid OTP, proceed with delete
                const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) });

                if (deleteResult.deletedCount === 0) {
                    return { statusCode: 404, body: JSON.stringify({ error: 'Post not found' }) };
                }

                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'Deleted successfully' })
                };
            }

            default:
                return { statusCode: 405, body: 'Method Not Allowed' };
        }
    } catch (error) {
        console.error('Database Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: (error as Error).message }),
        };
    }
};
