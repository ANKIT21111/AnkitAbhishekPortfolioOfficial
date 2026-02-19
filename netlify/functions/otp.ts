import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';

export const handler: Handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('otps');

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const email = process.env.VITE_CONTACT_EMAIL;
        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;

        if (!email || !scriptUrl) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server configuration missing' })
            };
        }

        // Store OTP with expiry (5 minutes)
        await collection.deleteOne({ email }); // Remove any old OTPs for this email
        await collection.insertOne({
            otp,
            email,
            createdAt: new Date()
        });

        // Send OTP via Google Apps Script
        // Using built-in fetch (available in Node 18+)
        await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({
                identifier: 'SYSTEM_VERIFICATION',
                email: 'system@portfolio.com',
                message: `Your technical authorization code for data packet purging is: ${otp}\n\nThis code will expire in 5 minutes.`,
                targetEmail: email,
                timestamp: new Date().toISOString()
            })
        });

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'OTP_SENT_SUCCESSFULLY' })
        };

    } catch (error) {
        console.error('OTP Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: (error as Error).message }),
        };
    }
};
