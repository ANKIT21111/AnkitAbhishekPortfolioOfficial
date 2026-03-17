export const getEmailTemplate = (content: string, previewText: string = '') => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ankit Abhishek | Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; color: #e5e7eb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="display: none; max-height: 0px; overflow: hidden;">
        ${previewText}
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #050505;">
        <tr>
            <td align="center" style="padding: 40px 10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 30px; border-bottom: 1px solid #1e293b; background: linear-gradient(to right, #1e1b4b, #0f172a);">
                            <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; color: #3b82f6; text-transform: uppercase;">
                                ANKIT<span style="color: #ffffff;">ABHISHEK</span>
                            </h1>
                            <p style="margin: 8px 0 0; font-size: 10px; font-family: monospace; color: #6366f1; text-transform: uppercase; letter-spacing: 0.3em; font-weight: bold;">
                                Studio_Core_v4.0 // Secure_Transmission
                            </p>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            ${content}
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 30px; background-color: #020617; border-top: 1px solid #1e293b;">
                            <p style="margin: 0; font-size: 11px; color: #64748b; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em;">
                                © 2026 Ankit Abhishek. All rights reserved.
                            </p>
                            <div style="margin-top: 20px;">
                                <a href="https://portfolio-official.netlify.app" style="color: #3b82f6; text-decoration: none; font-size: 11px; font-weight: bold; margin: 0 15px; text-transform: uppercase; letter-spacing: 1px;">Portfolio</a>
                                <a href="https://youtube.com/@ForgeIndicta" style="color: #ef4444; text-decoration: none; font-size: 11px; font-weight: bold; margin: 0 15px; text-transform: uppercase; letter-spacing: 1px;">YouTube</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

export const getOtpContent = (actionDescription: string, otp: string) => `
    <div style="text-align: center;">
        <div style="display: inline-block; padding: 8px 16px; border-radius: 50px; background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); margin-bottom: 24px;">
            <span style="font-size: 10px; font-family: monospace; font-weight: bold; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px;">Security Authorization</span>
        </div>
        <h2 style="margin: 0 0 16px; font-size: 22px; color: #ffffff; font-weight: 700;">Identity Verification</h2>
        <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 32px;">
            A validation sequence was initiated for <strong style="color: #ffffff;">${actionDescription}</strong>. Use the code below to authorize this transaction.
        </p>
        
        <div style="background-color: #1e293b; border: 1px dashed #3b82f6; border-radius: 16px; padding: 32px 20px; text-align: center; margin-bottom: 32px;">
            <div style="font-family: 'Courier New', Courier, monospace; font-size: 42px; font-weight: 800; color: #3b82f6; letter-spacing: 12px; margin-left: 12px;">
                ${otp}
            </div>
        </div>
        
        <p style="color: #64748b; font-size: 13px; margin: 0;">
            This code will expire in <span style="color: #f59e0b; font-weight: 600;">5 minutes</span>.
        </p>
    </div>
`;

export const getBlogContent = (title: string, description: string, url: string) => `
    <div>
        <div style="display: inline-block; padding: 8px 16px; border-radius: 50px; background-color: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); margin-bottom: 24px;">
            <span style="font-size: 10px; font-family: monospace; font-weight: bold; color: #22c55e; text-transform: uppercase; letter-spacing: 1px;">New Insight Logged</span>
        </div>
        <h2 style="margin: 0 0 12px; font-size: 26px; color: #ffffff; font-weight: 800; line-height: 1.2;">${title}</h2>
        <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
            Hello Subscriber, a new technical transmission has been deployed to the knowledge base.
        </p>
        
        <div style="background-color: #1e293b; border-radius: 16px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #3b82f6;">
            <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.6; font-style: italic;">
                "${description}"
            </p>
        </div>
        
        <div style="text-align: center;">
            <a href="${url}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 16px; font-weight: 800; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">
                Infiltrate_Stream
            </a>
        </div>
    </div>
`;

export const getCollaborateContent = (name: string, email: string, message: string, transmissionId: string) => `
    <div>
        <div style="display: inline-block; padding: 8px 16px; border-radius: 50px; background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); margin-bottom: 24px;">
            <span style="font-size: 10px; font-family: monospace; font-weight: bold; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px;">Incoming Transmission</span>
        </div>
        <h2 style="margin: 0 0 16px; font-size: 24px; color: #ffffff; font-weight: 700;">Collaboration Inquiry</h2>
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
            <tr>
                <td style="padding-bottom: 16px;">
                    <div style="font-family: monospace; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">IDENTIFIER</div>
                    <div style="color: #ffffff; font-size: 16px; font-weight: 600;">${name}</div>
                </td>
            </tr>
            <tr>
                <td style="padding-bottom: 16px;">
                    <div style="font-family: monospace; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">RETURN_PATH</div>
                    <div style="color: #3b82f6; font-size: 16px;">${email}</div>
                </td>
            </tr>
        </table>

        <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid #1e293b; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
            <div style="font-family: monospace; color: #6366f1; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 16px;">PAYLOAD_CONTENTS</div>
            <div style="color: #e2e8f0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>
        
        <div style="text-align: center; border-top: 1px solid #1e293b; pt: 24px;">
            <p style="color: #64748b; font-size: 11px; font-family: monospace;">REFERENCE_ID: #${transmissionId}</p>
        </div>
    </div>
`;

export const getMeetingContent = (name: string, email: string, date: string, time: string, message: string, transmissionId: string) => `
    <div>
        <div style="display: inline-block; padding: 8px 16px; border-radius: 50px; background-color: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); margin-bottom: 24px;">
            <span style="font-size: 10px; font-family: monospace; font-weight: bold; color: #6366f1; text-transform: uppercase; letter-spacing: 1px;">Sync Window Requested</span>
        </div>
        <h2 style="margin: 0 0 16px; font-size: 24px; color: #ffffff; font-weight: 700;">Meeting Confirmation</h2>
        
        <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border: 1px solid #3b82f6; border-radius: 20px; padding: 24px; margin-bottom: 32px; text-align: center;">
            <div style="font-family: monospace; color: #3b82f6; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 8px;">SCHEDULED_WINDOW</div>
            <div style="color: #ffffff; font-size: 22px; font-weight: 800;">${date} @ ${time}</div>
        </div>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
            <tr>
                <td style="padding-bottom: 16px;">
                    <div style="font-family: monospace; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">COORDINATOR</div>
                    <div style="color: #ffffff; font-size: 16px; font-weight: 600;">${name}</div>
                </td>
            </tr>
            <tr>
                <td style="padding-bottom: 16px;">
                    <div style="font-family: monospace; color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">ENDPOINT</div>
                    <div style="color: #3b82f6; font-size: 16px;">${email}</div>
                </td>
            </tr>
        </table>

         <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid #1e293b; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
            <div style="font-family: monospace; color: #6366f1; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 16px;">SYNC_OBJECTIVES</div>
            <div style="color: #e2e8f0; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
        </div>
        
        <div style="text-align: center;">
            <p style="color: #64748b; font-size: 11px; font-family: monospace;">TRANSMISSION_ID: #${transmissionId}</p>
        </div>
    </div>
`;

export const getWelcomeContent = () => `
    <div style="text-align: center;">
        <div style="display: inline-block; padding: 8px 16px; border-radius: 50px; background-color: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.2); margin-bottom: 24px;">
            <span style="font-size: 10px; font-family: monospace; font-weight: bold; color: #6366f1; text-transform: uppercase; letter-spacing: 1px;">Link Established</span>
        </div>
        <h2 style="margin: 0 0 16px; font-size: 24px; color: #ffffff; font-weight: 700;">Welcome to the Base</h2>
        <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin: 0 0 32px;">
            Your terminal is now synchronized with Ankit Abhishek's technical updates.
        </p>
        
        <a href="https://portfolio-official.netlify.app/thoughts" style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
            View knowledge_base
        </a>
    </div>
`;

