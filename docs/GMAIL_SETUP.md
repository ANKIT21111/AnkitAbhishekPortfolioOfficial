# Google Apps Script Setup (Structured Email Solution)

To send emails without any external libraries using your Gmail account, follow these steps:

1. Go to [Google Apps Script](https://script.google.com/).
2. Click **New Project**.
3. Replace the code in `Code.gs` with the following:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var recipient = "your-email@example.com";
    var subject = "🚀 Portfolio Handshake: " + (data.identifier || "Anonymous");
    
    // Structured HTML Email Content
    var htmlBody = `
      <div style="font-family: 'Courier New', monospace; background-color: #050505; color: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #1e293b;">
        <h2 style="color: #60a5fa; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">HANDSHAKE_PROTOCOL_INITIALIZED</h2>
        
        <div style="margin: 20px 0;">
          <p><strong style="color: #94a3b8;">IDENTIFIER:</strong> ${data.identifier}</p>
          <p><strong style="color: #94a3b8;">ENDPOINT:</strong> ${data.email}</p>
          <p><strong style="color: #94a3b8;">TIMESTAMP:</strong> ${data.timestamp || new Date().toISOString()}</p>
          <p><strong style="color: #94a3b8;">CLIENT_CORE:</strong> ${data.userAgent || "Unknown"}</p>
        </div>
        
        <div style="background-color: #0f172a; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <h3 style="margin-top: 0; font-size: 14px; color: #3b82f6;">PAYLOAD_MESSAGE:</h3>
          <p style="white-space: pre-wrap; color: #e2e8f0; line-height: 1.6;">${data.message}</p>
        </div>
        
        <div style="margin-top: 20px; font-size: 10px; color: #475569; text-align: center;">
          SYSTEM_ACCESS_GRANTED | SECURE_DATA_LAYER_V2.0
        </div>
      </div>
    `;
    
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody,
      replyTo: data.email
    });
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** > **New Deployment**.
5. Select type: **Web App**.
6. Set "Execute as": **Me**.
7. Set "Who has access": **Anyone**.
8. Click **Deploy**, authorize, and copy the **Web App URL**.
9. Paste into `.env` as `VITE_APPS_SCRIPT_URL`.
