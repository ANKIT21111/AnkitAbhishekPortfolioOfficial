import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { identifier, email, message, timestamp, userAgent } = req.body;

        if (!identifier || !email || !message) {
            return res.status(400).json({ error: 'Identifier, email, and message are required' });
        }

        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
        if (!scriptUrl) {
            return res.status(500).json({ error: "VITE_APPS_SCRIPT_URL not configured" });
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
            return res.status(200).json({ message: "Handshake transmission successful. Data received." });
        } else {
            return res.status(500).json({ error: "Failed to transmit data through Gmail bridge." });
        }

    } catch (error: any) {
        console.error("Contact API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
