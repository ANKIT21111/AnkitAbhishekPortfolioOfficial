import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';

export const handler: Handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('subscribers');

        if (!event.body) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing body' }) };
        }

        const { email } = JSON.parse(event.body);

        if (!email) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing email' }) };
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Update active status to false
        const result = await collection.updateOne(
            { email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } },
            { $set: { active: false, unsubscribedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return { 
                statusCode: 404, 
                headers, 
                body: JSON.stringify({ error: 'SUBSCRIPTION_NOT_FOUND' }) 
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'UNSUBSCRIBE_SUCCESSFUL' })
        };

    } catch (error) {
        console.error('Unsubscribe Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: (error as Error).message }),
        };
    }
};
