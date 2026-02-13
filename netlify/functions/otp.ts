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

export const handler = async (event: any) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const db = await getDb();
        const collection = db.collection('otps');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const email = process.env.VITE_CONTACT_EMAIL || 'ankitabhishek1005@gmail.com';

        await collection.deleteOne({ email });
        await collection.insertOne({
            email,
            otp,
            createdAt: new Date()
        });

        const scriptUrl = process.env.VITE_APPS_SCRIPT_URL;
        if (!scriptUrl) {
            return { statusCode: 500, body: JSON.stringify({ error: "VITE_APPS_SCRIPT_URL not configured" }) };
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
            return { statusCode: 200, body: JSON.stringify({ message: "OTP sent successfully to registered email." }) };
        } else {
            return { statusCode: 500, body: JSON.stringify({ error: "Failed to send OTP email." }) };
        }

    } catch (error: any) {
        console.error("OTP Error:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
};
