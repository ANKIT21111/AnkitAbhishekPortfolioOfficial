import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { ObjectId } from 'mongodb';
import { getEmailTemplate, getBlogContent } from './utils/emailTemplates';
import { validateObjectId, validateOtpStr, validateString, validateContent, validateNumber } from './utils/validation';
import { checkRateLimit, getClientIp } from './utils/rateLimit';

export const handler: Handler = async (event, context) => {
    try {
        const { db } = await connectToDatabase();
        
        // Rate Limiting
        const ip = getClientIp(event.headers);
        const limit = event.httpMethod === 'GET' ? 100 : 10;
        const windowMs = 15 * 60 * 1000; // 15 minutes
        
        const rateLimitResult = await checkRateLimit(db, ip, 'api_blog', limit, windowMs);
        if (!rateLimitResult.success) {
            return {
                statusCode: 429,
                headers: rateLimitResult.headers,
                body: JSON.stringify({ error: 'Too many requests. Please try again later.' })
            };
        }

        const collection = db.collection('posts');

        const verifyOtp = async (providedOtp: string | undefined) => {
            const validOtpStr = validateOtpStr(providedOtp);
            if (!validOtpStr) return { valid: false, error: 'Missing or Invalid OTP' };
            const otpCollection = db.collection('otps');
            const email = process.env.VITE_CONTACT_EMAIL;
            const otpRecord = await otpCollection.findOne({ email, otp: validOtpStr });

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
                const rawId = event.queryStringParameters?.id;

                if (rawId) {
                    const id = validateObjectId(rawId);
                    if (!id) {
                        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid ID format' }) };
                    }
                    const post = await collection.findOne({ _id: new ObjectId(id) });
                    if (!post) {
                        return { statusCode: 404, body: JSON.stringify({ error: 'Post not found' }) };
                    }
                    return {
                        statusCode: 200,
                        headers: { 
                            'Content-Type': 'application/json',
                            ...rateLimitResult.headers
                        },
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
                        'Content-Type': 'application/json',
                        ...rateLimitResult.headers
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
                const title = validateString(newPost.title, 200, true);
                const content = validateContent(newPost.content);
                const description = (newPost.description ? validateString(newPost.description, 1000, true) : null) || 'No description provided';

                if (!title || !content) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing or invalid title/content. HTML is disallowed in title.' }) };
                }

                const postToSave = {
                    title,
                    content,
                    description,
                    coverImage: newPost.coverImage ? validateString(newPost.coverImage, 5000000, false) : null,
                    timestamp: validateNumber(newPost.timestamp) || Date.now(),
                    date: validateString(newPost.date, 20, true) || new Date().toISOString().split('T')[0],
                    time: validateString(newPost.time, 20, true) || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };

                const insertResult = await collection.insertOne(postToSave);

                // Notify Subscribers
                const subscribersCollection = db.collection('subscribers');
                const subscribers = await subscribersCollection.find({ active: true }).toArray();
                const scriptUrl = process.env.VITE_APPS_SCRIPT_URL || process.env.APPS_SCRIPT_URL;

                if (scriptUrl && subscribers.length > 0) {
                    const blogUrl = `https://ankitabhishek.netlify.app/thoughts?id=${insertResult.insertedId.toString()}`;
                    
                    // Send individual emails to ensure personalized unsubscribe links
                    const notificationPromises = subscribers.map(async (subscriber: any) => {
                        const htmlMessage = getEmailTemplate(
                            getBlogContent(title as string, description, blogUrl),
                            `New Insight: ${title as string}`,
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
                                subject: `Ankit Abhishek - New Post: ${title as string}`,
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
                    headers: { 
                        'Content-Type': 'application/json',
                        ...rateLimitResult.headers
                    },
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
                const targetId = validateObjectId(updateData.id || updateData._id);

                if (!targetId) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing or Invalid ID format' }) };
                }

                const dataToUpdate: any = {};
                if (updateData.title) dataToUpdate.title = validateString(updateData.title, 200, true);
                if (updateData.description) dataToUpdate.description = validateString(updateData.description, 1000, true);
                if (updateData.content) dataToUpdate.content = validateContent(updateData.content);
                if (updateData.coverImage) dataToUpdate.coverImage = validateString(updateData.coverImage, 5000000, false);
                if (updateData.date) dataToUpdate.date = validateString(updateData.date, 20, true);
                if (updateData.time) dataToUpdate.time = validateString(updateData.time, 20, true);
                if (updateData.timestamp) dataToUpdate.timestamp = validateNumber(updateData.timestamp);

                if ((updateData.title && !dataToUpdate.title) || (updateData.content && !dataToUpdate.content)) {
                     return { statusCode: 400, body: JSON.stringify({ error: 'Invalid title or content update data.' }) };
                }

                await collection.updateOne(
                    { _id: new ObjectId(targetId) },
                    { $set: dataToUpdate }
                );

                return {
                    statusCode: 200,
                    headers: { 
                        'Content-Type': 'application/json',
                        ...rateLimitResult.headers
                    },
                    body: JSON.stringify({ message: 'Updated successfully', id: targetId })
                };
            }

            case 'DELETE': {
                // Expect ID and OTP in query parameters: ?id=...&otp=...
                const deleteId = validateObjectId(event.queryStringParameters?.id);
                const providedOtp = event.queryStringParameters?.otp;

                const otpVerification = await verifyOtp(providedOtp);
                if (!otpVerification.valid) {
                    return { statusCode: 401, body: JSON.stringify({ error: otpVerification.error }) };
                }

                if (!deleteId) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing or Invalid ID format' }) };
                }

                // Valid OTP, proceed with delete
                const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) });

                if (deleteResult.deletedCount === 0) {
                    return { statusCode: 404, body: JSON.stringify({ error: 'Post not found' }) };
                }

                return {
                    statusCode: 200,
                    headers: { 
                        'Content-Type': 'application/json',
                        ...rateLimitResult.headers
                    },
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
