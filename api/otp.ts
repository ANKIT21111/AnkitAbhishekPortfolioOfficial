import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let dbConnection: any = null;

async function getDb() {
    if (dbConnection) return dbConnection;
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined");
    if (!client) client = new MongoClient(uri);
    await client.connect();
    dbConnection = client.db('portfolio');
    return dbConnection;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const db = await getDb();
        const collection = db.collection('otps');

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const email = process.env.VITE_CONTACT_EMAIL || 'ankitabhishek1005@gmail.com';

        // Store OTP in database with timestamp (expires in 5 minutes)
        await collection.deleteOne({ email }); // Clear previous OTP for this email
        await collection.insertOne({
            email,
            otp,
            createdAt: new Date()
        });

        // Send OTP via Google Apps Script
        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
        if (!scriptUrl) {
            return res.status(500).json({ error: "VITE_APPS_SCRIPT_URL not configured" });
        }

        const payload = {
            identifier: "Blog Deletion Request",
            email: "SYSTEM",
            message: `Your OTP for blog deletion/management is: ${otp}\n\nThis OTP will expire in 5 minutes.`,
            timestamp: new Date().toISOString()
        };

        const emailResponse = await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (emailResponse.ok) {
            return res.status(200).json({ message: "OTP sent successfully to registered email." });
        } else {
            return res.status(500).json({ error: "Failed to send OTP email." });
        }

    } catch (error: any) {
        console.error("OTP Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
