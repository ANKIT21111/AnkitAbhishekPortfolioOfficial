import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { validateEmail } from './utils/validation';
import { checkRateLimit, getClientIp } from './utils/rateLimit';

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
        
        // Rate Limiting
        const ip = getClientIp(event.headers);
        const rateLimitResult = await checkRateLimit(db, ip, 'unsubscribe_newsletter', 5, 24 * 60 * 60 * 1000); // 5 attempts per day
        if (!rateLimitResult.success) {
            return {
                statusCode: 429,
                headers: { ...headers, ...rateLimitResult.headers },
                body: JSON.stringify({ error: 'Too many unsubscribe requests. Please try again tomorrow.' })
            };
        }

        const collection = db.collection('subscribers');

        if (!event.body) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing body' }) };
        }

        const parsedBody = JSON.parse(event.body);
        const email = validateEmail(parsedBody.email);

        if (!email) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing or Invalid email address' }) };
        }

        // Normalize email
        const normalizedEmail = email; // validateEmail already returns lowered/trimmed string

        // Update active status to false
        const result = await collection.updateOne(
            { email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } },
            { $set: { active: false, unsubscribedAt: new Date() } }
        );

        if (result.matchedCount === 0) {
            return { 
                statusCode: 404, 
                headers: { ...headers, ...rateLimitResult.headers },
                body: JSON.stringify({ error: 'SUBSCRIPTION_NOT_FOUND' }) 
            };
        }

        return {
            statusCode: 200,
            headers: { ...headers, ...rateLimitResult.headers },
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
