import { Handler } from '@netlify/functions';
import { connectToDatabase } from './utils/db';
import { validateOtpStr } from './utils/validation';
import { checkRateLimit, getClientIp } from './utils/rateLimit';

export const handler: Handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { db } = await connectToDatabase();
        
        // Rate Limiting
        const ip = getClientIp(event.headers);
        const rateLimitResult = await checkRateLimit(db, ip, 'auth_login', 5, 15 * 60 * 1000); // 5 attempts per 15 minutes
        if (!rateLimitResult.success) {
            return {
                statusCode: 429,
                headers: rateLimitResult.headers,
                body: JSON.stringify({ error: 'Too many login attempts. Please try again later.' })
            };
        }

        const otpCollection = db.collection('otps');
        const parsedBody = JSON.parse(event.body || '{}');
        const otp = validateOtpStr(parsedBody.otp);

        if (!otp) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing or Invalid OTP' })
            };
        }

        const email = process.env.VITE_CONTACT_EMAIL;
        const otpRecord = await otpCollection.findOne({ email, otp });

        if (!otpRecord) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'INVALID_OR_EXPIRED_OTP' })
            };
        }

        const now = new Date();
        const otpTime = new Date(otpRecord.createdAt);
        if (now.getTime() - otpTime.getTime() > 300000) { // 5 minutes
            await otpCollection.deleteOne({ _id: otpRecord._id });
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'OTP_EXPIRED' })
            };
        }

        // Valid OTP, delete it so it can't be reused
        await otpCollection.deleteOne({ _id: otpRecord._id });

        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                ...rateLimitResult.headers
            },
            body: JSON.stringify({ message: 'ADMIN_ACCESS_GRANTED' })
        };

    } catch (error) {
        console.error('Auth Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: (error as Error).message }),
        };
    }
};
