import { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const { identifier, email, message, timestamp, userAgent } = JSON.parse(event.body || '{}');

        if (!identifier || !email || !message) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Identifier, email, and message are required' }) };
        }

        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
        if (!scriptUrl) {
            return { statusCode: 500, body: JSON.stringify({ error: "VITE_APPS_SCRIPT_URL not configured" }) };
        }

        // Construct a structured message for the email
        const structuredMessage = `
[NEW_HANDSHAKE_INITIALIZED]
---------------------------
CLIENT_IDENTIFIER : ${identifier}
CLIENT_ENDPOINT   : ${email}
TIMESTAMP         : ${timestamp}
SYSTEM_AGENT      : ${userAgent}

PAYLOAD_MESSAGE:
${message}
---------------------------
[END_TRANSMISSION]
        `.trim();

        const payload = {
            identifier: `Portfolio Handshake: ${identifier}`,
            email: email,
            message: structuredMessage,
            timestamp: timestamp || new Date().toISOString()
        };

        const emailResponse = await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (emailResponse.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Handshake transmission successful. Data received." })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Failed to transmit data through Gmail bridge." })
            };
        }

    } catch (error: any) {
        console.error("Contact API Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
};
