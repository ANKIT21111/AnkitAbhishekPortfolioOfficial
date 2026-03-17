import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';

export const handler: Handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('subscribers');

        if (!event.body) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing body' }) };
        }

        const { email } = JSON.parse(event.body);

        if (!email || !email.includes('@')) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) };
        }

        // Check if already subscribed
        const existing = await collection.findOne({ email });
        if (existing) {
            return { 
                statusCode: 200, 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'ALREADY_SUBSCRIBED' }) 
            };
        }

        await collection.insertOne({
            email,
            subscribedAt: new Date(),
            active: true
        });

        return {
            statusCode: 201,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'SUBSCRIPTION_SUCCESSFUL' })
        };

    } catch (error) {
        console.error('Subscription Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: (error as Error).message }),
        };
    }
};
