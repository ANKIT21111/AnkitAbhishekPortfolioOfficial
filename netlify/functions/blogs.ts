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

export const handler = async (event: any) => {
    const method = event.httpMethod;

    // Security check only for deletion
    if (method === 'DELETE') {
        const otp = event.headers['x-otp'];

        if (!otp) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Unauthorized: Missing OTP" })
            };
        }

        try {
            const db = await getDb();
            const otpCollection = db.collection('otps');
            const email = process.env.VITE_CONTACT_EMAIL || 'ankitabhishek1005@gmail.com';

            const storedOtp = await otpCollection.findOne({
                email,
                otp,
                createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) }
            });

            if (!storedOtp) {
                return {
                    statusCode: 401,
                    body: JSON.stringify({ error: "Unauthorized: Invalid or expired OTP" })
                };
            }

            await otpCollection.deleteOne({ _id: storedOtp._id });

        } catch (e) {
            console.error("Auth Error:", e);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Authentication Service Error" })
            };
        }
    }

    if (!process.env.MONGODB_URI) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server Configuration Error" })
        };
    }

    try {
        const db = await getDb();
        const collection = db.collection('blogs');

        switch (method) {
            case 'GET':
                try {
                    const blogs = await collection.find({}).sort({ date: -1, time: -1 }).toArray();
                    return {
                        statusCode: 200,
                        body: JSON.stringify(blogs)
                    };
                } catch (e: any) {
                    return {
                        statusCode: 500,
                        body: JSON.stringify({ error: "Failed to fetch blogs from database" })
                    };
                }

            case 'POST':
                if (!event.body) return { statusCode: 400, body: JSON.stringify({ error: "Body required" }) };
                const newBlog = JSON.parse(event.body);
                if (!newBlog.title || !newBlog.content) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: "Title and Content are required" })
                    };
                }
                delete newBlog._id;
                const result = await collection.insertOne(newBlog);
                return {
                    statusCode: 201,
                    body: JSON.stringify({ ...newBlog, _id: result.insertedId })
                };

            case 'PUT':
                if (!event.body) return { statusCode: 400, body: JSON.stringify({ error: "Body required" }) };
                const putData = JSON.parse(event.body);
                const { _id, ...updateData } = putData;
                if (!_id) return { statusCode: 400, body: JSON.stringify({ error: "Missing _id for update operation" }) };

                try {
                    const updateResult = await collection.updateOne(
                        { _id: new ObjectId(_id) },
                        { $set: updateData }
                    );
                    if (updateResult.matchedCount === 0) {
                        return { statusCode: 404, body: JSON.stringify({ error: "Blog post not found" }) };
                    }
                    return { statusCode: 200, body: JSON.stringify({ message: "Updated successfully" }) };
                } catch (e: any) {
                    return { statusCode: 400, body: JSON.stringify({ error: "Invalid ID format" }) };
                }

            case 'DELETE':
                const id = event.queryStringParameters?.id;
                if (!id) return { statusCode: 400, body: JSON.stringify({ error: "Missing id for deletion" }) };

                try {
                    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
                    if (deleteResult.deletedCount === 0) {
                        return { statusCode: 404, body: JSON.stringify({ error: "Blog post not found" }) };
                    }
                    return { statusCode: 200, body: JSON.stringify({ message: "Deleted successfully" }) };
                } catch (e: any) {
                    return { statusCode: 400, body: JSON.stringify({ error: "Invalid ID format" }) };
                }

            default:
                return {
                    statusCode: 405,
                    body: `Method ${method} Not Allowed`,
                    headers: { 'Allow': 'GET, POST, PUT, DELETE' }
                };
        }
    } catch (error: any) {
        console.error("Critical API Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
};
