import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { ObjectId } from 'mongodb';

export const handler: Handler = async (event, context) => {
    // Prevent context from waiting for empty event loop, allowing faster responses
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('posts');

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


            case 'POST':
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

                return {
                    statusCode: 201,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...postToSave,
                        id: insertResult.insertedId.toString()
                    }),
                };

            case 'PUT':
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

            case 'DELETE':
                // Expect ID and OTP in query parameters: ?id=...&otp=...
                const deleteId = event.queryStringParameters?.id;
                const providedOtp = event.queryStringParameters?.otp;

                if (!deleteId || !providedOtp) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing ID or OTP' }) };
                }

                // Verify OTP
                const otpCollection = db.collection('otps');
                const email = process.env.VITE_CONTACT_EMAIL;
                const otpRecord = await otpCollection.findOne({ email, otp: providedOtp });

                if (!otpRecord) {
                    return { statusCode: 401, body: JSON.stringify({ error: 'INVALID_OR_EXPIRED_OTP' }) };
                }

                // Check expiry (5 minutes = 300,000 ms)
                const now = new Date();
                const otpTime = new Date(otpRecord.createdAt);
                if (now.getTime() - otpTime.getTime() > 300000) {
                    await otpCollection.deleteOne({ _id: otpRecord._id });
                    return { statusCode: 401, body: JSON.stringify({ error: 'OTP_EXPIRED' }) };
                }

                // Valid OTP, proceed with delete
                const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) });

                // Clear OTP after success
                await otpCollection.deleteOne({ _id: otpRecord._id });

                if (deleteResult.deletedCount === 0) {
                    return { statusCode: 404, body: JSON.stringify({ error: 'Post not found' }) };
                }

                return {
                    statusCode: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'Deleted successfully' })
                };

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
