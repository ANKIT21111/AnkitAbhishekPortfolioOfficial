import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getEmailTemplate, getWelcomeContent } from './utils/emailTemplates';
import { validateEmail } from './utils/validation';

export const handler: Handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('subscribers');

        if (!event.body) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing body' }) };
        }

        const parsedBody = JSON.parse(event.body);
        const email = validateEmail(parsedBody.email);

        if (!email) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email address' }) };
        }

        // Check if already exists
        const existing = await collection.findOne({ email });
        
        if (existing) {
            if (existing.active) {
                return { 
                    statusCode: 200, 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'ALREADY_SUBSCRIBED' }) 
                };
            } else {
                // Reactivate previously unsubscribed email
                await collection.updateOne(
                    { email },
                    { $set: { active: true, resubscribedAt: new Date() } }
                );
            }
        } else {
            // New subscription
            await collection.insertOne({
                email,
                subscribedAt: new Date(),
                active: true
            });
        }

        // Send Welcome Email
        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL || process.env.APPS_SCRIPT_URL;
        if (scriptUrl) {
            const htmlMessage = getEmailTemplate(
                getWelcomeContent(),
                "Connection Established: Welcome to the Base"
            );

            try {
                // We MUST await this fetch so the function doesn't terminate before sending
                await fetch(scriptUrl, {
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
                });
            } catch (err) {
                console.error('Failed to send welcome email:', err);
            }
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
