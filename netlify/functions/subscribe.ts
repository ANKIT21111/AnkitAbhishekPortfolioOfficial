import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getEmailTemplate, getWelcomeContent } from './utils/emailTemplates';

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

        // Send Welcome Email
        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
        if (scriptUrl) {
            const htmlMessage = getEmailTemplate(
                getWelcomeContent(),
                "Connection Established: Welcome to the Base"
            );

            fetch(scriptUrl, {
                method: 'POST',
                body: JSON.stringify({
                    identifier: 'WELCOME_SUBSCRIBER',
                    email: 'system@portfolio.com',
                    message: htmlMessage, // Full HTML
                    subject: "Welcome to Ankit Abhishek's Knowledge Base", // Specific Subject
                    targetEmail: email,
                    timestamp: new Date().toISOString(),
                    isHtml: true
                })
            }).catch(err => console.error('Failed to send welcome email:', err));
        }

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
