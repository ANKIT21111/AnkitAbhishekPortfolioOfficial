import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, ObjectId } from 'mongodb';

let client: MongoClient | null = null;
let dbConnection: any = null;

async function getDb() {
    if (dbConnection) return dbConnection;

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    if (!client) {
        client = new MongoClient(uri);
    }

    await client.connect();
    dbConnection = client.db('portfolio');
    return dbConnection;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const { method } = req;

    // Security check only for deletion
    if (method === 'DELETE') {
        const otp = req.headers['x-otp'];

        if (!otp) {
            return res.status(401).json({ error: "Unauthorized: Missing OTP" });
        }

        try {
            const db = await getDb();
            const otpCollection = db.collection('otps');
            const email = process.env.VITE_CONTACT_EMAIL || 'ankitabhishek1005@gmail.com';

            // Find valid OTP (not older than 5 minutes)
            const storedOtp = await otpCollection.findOne({
                email,
                otp,
                createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
            });

            if (!storedOtp) {
                return res.status(401).json({ error: "Unauthorized: Invalid or expired OTP" });
            }

            // OTP is one-time use
            await otpCollection.deleteOne({ _id: storedOtp._id });

        } catch (e) {
            console.error("Auth Error:", e);
            return res.status(500).json({ error: "Authentication Service Error" });
        }
    }

    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is missing");
        return res.status(500).json({ error: "Server Configuration Error" });
    }

    try {
        const db = await getDb();
        const collection = db.collection('blogs');

        switch (method) {
            case 'GET':
                try {
                    const blogs = await collection.find({}).sort({ date: -1, time: -1 }).toArray();
                    return res.status(200).json(blogs);
                } catch (e: any) {
                    console.error("Error fetching blogs:", e);
                    return res.status(500).json({ error: "Failed to fetch blogs from database" });
                }

            case 'POST':
                const newBlog = req.body;
                if (!newBlog.title || !newBlog.content) {
                    return res.status(400).json({ error: "Title and Content are required" });
                }
                // Ensure id is not present or clean it up if it's from frontend
                delete newBlog._id;
                const result = await collection.insertOne(newBlog);
                return res.status(201).json({ ...newBlog, _id: result.insertedId });

            case 'PUT':
                const { _id, ...updateData } = req.body;
                if (!_id) return res.status(400).json({ error: "Missing _id for update operation" });

                try {
                    const updateResult = await collection.updateOne(
                        { _id: new ObjectId(_id) },
                        { $set: updateData }
                    );
                    if (updateResult.matchedCount === 0) {
                        return res.status(404).json({ error: "Blog post not found" });
                    }
                    return res.status(200).json({ message: "Updated successfully" });
                } catch (e: any) {
                    return res.status(400).json({ error: "Invalid ID format" });
                }

            case 'DELETE':
                const { id } = req.query;
                if (!id) return res.status(400).json({ error: "Missing id for deletion" });

                try {
                    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id as string) });
                    if (deleteResult.deletedCount === 0) {
                        return res.status(404).json({ error: "Blog post not found" });
                    }
                    return res.status(200).json({ message: "Deleted successfully" });
                } catch (e: any) {
                    return res.status(400).json({ error: "Invalid ID format" });
                }

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error: any) {
        console.error("Critical API Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
