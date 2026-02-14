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
            case 'GET':
                const posts = await collection.find({}).sort({ timestamp: -1 }).toArray();
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(posts.map((post: any) => ({
                        ...post,
                        id: post._id.toString() // Convert ObjectId to string for frontend
                    }))),
                };

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
                // Expect ID in query parameters: ?id=...
                const deleteId = event.queryStringParameters?.id;

                if (!deleteId) {
                    return { statusCode: 400, body: JSON.stringify({ error: 'Missing ID parameter' }) };
                }

                const deleteResult = await collection.deleteOne({ _id: new ObjectId(deleteId) });

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
