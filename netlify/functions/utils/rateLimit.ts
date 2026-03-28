import { Db } from 'mongodb';

interface RateLimitTracker {
    ip: string;
    endpoint: string;
    count: number;
    resetTime: number;
}

export function getClientIp(headers: any): string {
    const rawHeaders = headers || {};
    const ip = rawHeaders['x-forwarded-for'] || rawHeaders['X-Forwarded-For'] || rawHeaders['client-ip'] || '';
    return ip.split(',')[0].trim() || '127.0.0.1';
}

export async function checkRateLimit(
    db: Db,
    ip: string,
    endpoint: string,
    limit: number,
    windowMs: number
): Promise<{ success: boolean; headers: any; error?: string }> {
    const collection = db.collection<RateLimitTracker>('rate_limits');
    const now = Date.now();
    
    // Find existing record
    let record = await collection.findOne({ ip, endpoint });

    if (!record) {
        // Insert new
        await collection.insertOne({
            ip,
            endpoint,
            count: 1,
            resetTime: now + windowMs
        });
        return {
            success: true,
            headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': (limit - 1).toString(),
                'X-RateLimit-Reset': new Date(now + windowMs).toISOString(),
            }
        };
    }

    if (now > record.resetTime) {
        // Reset window
        await collection.updateOne(
            { _id: record._id },
            { $set: { count: 1, resetTime: now + windowMs } }
        );
        return {
            success: true,
            headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': (limit - 1).toString(),
                'X-RateLimit-Reset': new Date(now + windowMs).toISOString(),
            }
        };
    }

    if (record.count >= limit) {
        return {
            success: false,
            error: 'RATE_LIMIT_EXCEEDED',
            headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': new Date(record.resetTime).toISOString(),
                'Retry-After': Math.ceil((record.resetTime - now) / 1000).toString()
            }
        };
    }

    // Increment count
    await collection.updateOne(
        { _id: record._id },
        { $inc: { count: 1 } }
    );

    return {
        success: true,
        headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': (limit - record.count - 1).toString(),
            'X-RateLimit-Reset': new Date(record.resetTime).toISOString(),
        }
    };
}
