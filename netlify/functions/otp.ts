import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { getEmailTemplate, getOtpContent } from './utils/emailTemplates';

export const handler: Handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { db } = await connectToDatabase();
        const collection = db.collection('otps');

        const { action } = JSON.parse(event.body || '{}');

        // Map actions to specific descriptions and subjects
        let actionDescription = 'technical operation';
        let subject = 'System Authorization Code';
        
        if (action === 'CREATE') {
            actionDescription = 'creation of a new blog post';
            subject = 'Auth: Create New Blog Post';
        } else if (action === 'UPDATE') {
            actionDescription = 'modification of an existing blog post';
            subject = 'Auth: Update Blog Post';
        } else if (action === 'DELETE') {
            actionDescription = 'deletion of a blog post';
            subject = 'Auth: Delete Blog Post';
        }

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
        await collection.deleteOne({ email }); 
        await collection.insertOne({
            otp,
            email,
            createdAt: new Date()
        });

        const htmlMessage = getEmailTemplate(
            getOtpContent(actionDescription, otp),
            `Your authorization code for ${actionDescription} is: ${otp}`
        );

        // Send OTP via Google Apps Script
        await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({
                identifier: 'SYSTEM_VERIFICATION',
                email: 'system@portfolio.com',
                message: htmlMessage, // Full HTML Design
                subject: subject,    // Dynamic Subject
                targetEmail: email,
                timestamp: new Date().toISOString(),
                isHtml: true
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
