export const validateObjectId = (id: unknown): string | null => {
    if (typeof id !== 'string') return null;
    const trimmed = id.trim();
    if (!/^[0-9a-fA-F]{24}$/.test(trimmed)) return null;
    return trimmed;
};

export const validateString = (str: unknown, maxLength: number = 2000, rejectHtml: boolean = false): string | null => {
    if (typeof str !== 'string') return null;
    const trimmed = str.trim();
    if (trimmed.length === 0 || trimmed.length > maxLength) return null;
    
    // Basic script injection prevention
    if (/(<script\b[^>]*>[\s\S]*?<\/script>)|(javascript:)|(data:text\/html)/i.test(trimmed)) {
        return null;
    }

    if (rejectHtml && /[<>]/.test(trimmed)) {
        return null; // strictly reject string containing HTML tags
    }

    return trimmed;
};

export const validateEmail = (email: unknown): string | null => {
    if (typeof email !== 'string') return null;
    const trimmed = email.trim();
    if (trimmed.length > 254) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return null;
    return trimmed.toLowerCase();
};

export const validateOtpStr = (otp: unknown): string | null => {
    if (typeof otp !== 'string') return null;
    const trimmed = otp.trim();
    if (!/^\d{6}$/.test(trimmed)) return null;
    return trimmed;
};

// Validates and partially sanitizes rich text (Markdown/HTML)
export const validateContent = (content: unknown, maxLength: number = 5000000): string | null => {
    if (typeof content !== 'string') return null;
    const trimmed = content.trim();
    if (trimmed.length === 0 || trimmed.length > maxLength) return null;
    
    // Reject explicit script tags and common dangerous attributes (XSS prevention)
    const dangerousPatterns = [
        /<script\b[^>]*>[\s\S]*?<\/script>/gi,
        /javascript:/gi,
        /vbscript:/gi,
        /\bon\w+\s*=/gi, // inline event handlers: onClick, onLoad, etc.
        /data:text\/html/gi,
        /eval\(/gi
    ];
    
    for (const pattern of dangerousPatterns) {
        if (pattern.test(trimmed)) return null;
    }
    
    return trimmed;
};

// Validate numbers strictly
export const validateNumber = (num: unknown, min?: number, max?: number): number | null => {
    if (typeof num === 'string' && num.trim() !== '') {
        const parsed = Number(num);
        if (Number.isNaN(parsed)) return null;
        if (min !== undefined && parsed < min) return null;
        if (max !== undefined && parsed > max) return null;
        return parsed;
    }
    if (typeof num === 'number') {
        if (Number.isNaN(num)) return null;
        if (min !== undefined && num < min) return null;
        if (max !== undefined && num > max) return null;
        return num;
    }
    return null;
};
