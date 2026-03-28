import { Handler } from '@netlify/functions';
import { getEmailTemplate, getCollaborateContent, getMeetingContent } from './utils/emailTemplates';
import { validateString, validateEmail, validateContent } from './utils/validation';
import { connectToDatabase } from './utils/db';
import { checkRateLimit, getClientIp } from './utils/rateLimit';

export const handler: Handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { db } = await connectToDatabase();
        
        // Rate Limiting
        const ip = getClientIp(event.headers);
        const rateLimitResult = await checkRateLimit(db, ip, 'collaborate', 5, 24 * 60 * 60 * 1000); // 5 attempts per day
        if (!rateLimitResult.success) {
            return {
                statusCode: 429,
                headers: rateLimitResult.headers,
                body: JSON.stringify({ error: 'Too many collaboration requests. Please try again tomorrow.' })
            };
        }

        const data = JSON.parse(event.body || '{}');
        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL || process.env.APPS_SCRIPT_URL;
        const contactEmail = process.env.VITE_CONTACT_EMAIL;

        if (!scriptUrl || !contactEmail) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server configuration missing' })
            };
        }

        const identifier = validateString(data.identifier, 100, true);
        const email = validateEmail(data.email);
        const message = validateContent(data.message, 5000);
        const isMeeting = Boolean(data.isMeeting);
        const meetingDate = isMeeting ? validateString(data.meetingDate, 50, true) : null;
        const meetingTime = isMeeting ? validateString(data.meetingTime, 50, true) : null;
        
        if (!identifier || !email || !message) {
             return { statusCode: 400, body: JSON.stringify({ error: 'Invalid or malformed input data' }) };
        }
        if (isMeeting && (!meetingDate || !meetingTime)) {
             return { statusCode: 400, body: JSON.stringify({ error: 'Invalid meeting schedule data' }) };
        }

        const validId = validateString(data.id, 50, true);
        const transmissionId = validId || Math.random().toString(36).substr(2, 9).toUpperCase();

        let subject = '';
        let htmlContent = '';

        if (isMeeting) {
            subject = `[MEETING] Sync Sequence Scheduled | ${identifier} (${meetingDate})`;
            htmlContent = getMeetingContent(identifier, email, meetingDate as string, meetingTime as string, message, transmissionId);
        } else {
            subject = `[INQUIRY] New Collaboration Requested | ${identifier}`;
            htmlContent = getCollaborateContent(identifier, email, message, transmissionId);
        }

        const htmlMessage = getEmailTemplate(htmlContent, subject);

        // Send to Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                id: transmissionId,
                targetEmail: contactEmail,
                subject: subject,
                message: htmlMessage,
                isHtml: true
            })
        });

        return {
            statusCode: 200,
            headers: rateLimitResult.headers,
            body: JSON.stringify({ message: 'TRANSMISSION_SUCCESSFUL', id: transmissionId })
        };

    } catch (error) {
        console.error('Collaborate Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: (error as Error).message }),
        };
    }
};
