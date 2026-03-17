import { Handler } from '@netlify/functions';
import { getEmailTemplate, getCollaborateContent, getMeetingContent } from './utils/emailTemplates';

export const handler: Handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body || '{}');
        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
        const contactEmail = process.env.VITE_CONTACT_EMAIL;

        if (!scriptUrl || !contactEmail) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server configuration missing' })
            };
        }

        const { identifier, email, message, isMeeting, meetingDate, meetingTime, id } = data;
        const transmissionId = id || Math.random().toString(36).substr(2, 9).toUpperCase();

        let subject = '';
        let htmlContent = '';

        if (isMeeting) {
            subject = `[MEETING] Sync Sequence Scheduled | ${identifier} (${meetingDate})`;
            htmlContent = getMeetingContent(identifier, email, meetingDate, meetingTime, message, transmissionId);
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
