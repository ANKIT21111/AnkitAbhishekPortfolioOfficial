/**
 * Google Apps Script — Portfolio Contact Form Email Handler
 * 
 * SETUP:
 * 1. Go to https://script.google.com → New Project
 * 2. Delete the default code and paste this entire file
 * 3. Click Deploy → New Deployment
 * 4. Select type: "Web app"
 * 5. Set "Execute as": Me (your Google account)
 * 6. Set "Who has access": Anyone
 * 7. Click Deploy → Authorize → Copy the Web App URL
 * 8. Paste that URL into your .env file as VITE_APPS_SCRIPT_URL
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    var senderName = data.identifier || "Unknown";
    var senderEmail = data.email || "No email provided";
    var senderMessage = data.message || "No message";
    var targetEmail = data.targetEmail || "ankitabhishek1005@gmail.com";
    var timestamp = data.timestamp || new Date().toISOString();
    var userAgent = data.userAgent || "Unknown";

    var subject = "🤝 New Portfolio Contact: " + senderName;
    
    var htmlBody = 
      '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 16px; overflow: hidden;">' +
      
      // Header
      '  <div style="background: linear-gradient(135deg, #1e40af, #4f46e5, #7c3aed); padding: 32px; text-align: center;">' +
      '    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Handshake Request</h1>' +
      '    <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 13px;">Portfolio Contact Form Submission</p>' +
      '  </div>' +
      
      // Body
      '  <div style="padding: 32px;">' +
      
      // Sender Details Card
      '    <div style="background: #111111; border: 1px solid #222; border-radius: 12px; padding: 24px; margin-bottom: 20px;">' +
      '      <h2 style="color: #60a5fa; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">Sender Details</h2>' +
      '      <table style="width: 100%; border-collapse: collapse;">' +
      '        <tr>' +
      '          <td style="color: #6b7280; padding: 8px 0; font-size: 13px; width: 100px;">Name</td>' +
      '          <td style="color: #ffffff; padding: 8px 0; font-size: 14px; font-weight: 600;">' + senderName + '</td>' +
      '        </tr>' +
      '        <tr>' +
      '          <td style="color: #6b7280; padding: 8px 0; font-size: 13px;">Email</td>' +
      '          <td style="color: #ffffff; padding: 8px 0; font-size: 14px;">' +
      '            <a href="mailto:' + senderEmail + '" style="color: #60a5fa; text-decoration: none;">' + senderEmail + '</a>' +
      '          </td>' +
      '        </tr>' +
      '        <tr>' +
      '          <td style="color: #6b7280; padding: 8px 0; font-size: 13px;">Time</td>' +
      '          <td style="color: #9ca3af; padding: 8px 0; font-size: 13px; font-family: monospace;">' + timestamp + '</td>' +
      '        </tr>' +
      '      </table>' +
      '    </div>' +
      
      // Message Card
      '    <div style="background: #111111; border: 1px solid #222; border-radius: 12px; padding: 24px; margin-bottom: 20px;">' +
      '      <h2 style="color: #60a5fa; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 16px;">Message</h2>' +
      '      <p style="color: #e5e7eb; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">' + senderMessage + '</p>' +
      '    </div>' +
      
      // Quick Reply Button
      '    <div style="text-align: center; margin-top: 24px;">' +
      '      <a href="mailto:' + senderEmail + '?subject=Re: Portfolio Inquiry" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #4f46e5); color: #ffffff; padding: 14px 36px; border-radius: 10px; text-decoration: none; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">↩ Reply to ' + senderName + '</a>' +
      '    </div>' +
      
      '  </div>' +
      
      // Footer
      '  <div style="background: #050505; border-top: 1px solid #1a1a1a; padding: 20px 32px; text-align: center;">' +
      '    <p style="color: #4b5563; font-size: 11px; margin: 0; font-family: monospace;">SECURE_HANDSHAKE_PROTOCOL_V2 • AES-256 • ' + timestamp + '</p>' +
      '    <p style="color: #374151; font-size: 10px; margin: 6px 0 0;">User Agent: ' + userAgent + '</p>' +
      '  </div>' +
      
      '</div>';

    var plainBody = 
      "New Portfolio Contact\n" +
      "━━━━━━━━━━━━━━━━━━━━━\n\n" +
      "Name: " + senderName + "\n" +
      "Email: " + senderEmail + "\n" +
      "Time: " + timestamp + "\n\n" +
      "Message:\n" + senderMessage + "\n\n" +
      "━━━━━━━━━━━━━━━━━━━━━\n" +
      "Sent from your portfolio contact form";

    GmailApp.sendEmail(targetEmail, subject, plainBody, {
      htmlBody: htmlBody,
      replyTo: senderEmail,
      name: "Portfolio Contact Form"
    });

    // Also log to a spreadsheet (optional — comment out if not needed)
    logToSheet(senderName, senderEmail, senderMessage, timestamp);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Email sent successfully" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Portfolio contact form handler is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Optional: Log submissions to a Google Sheet for record-keeping.
 * This automatically creates a sheet called "Contact Submissions" if it doesn't exist.
 */
function logToSheet(name, email, message, timestamp) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return; // Skip if no spreadsheet is bound
    
    var sheet = ss.getSheetByName("Contact Submissions");
    if (!sheet) {
      sheet = ss.insertSheet("Contact Submissions");
      sheet.appendRow(["Timestamp", "Name", "Email", "Message"]);
      // Style header row
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#1e40af").setFontColor("#ffffff");
    }
    sheet.appendRow([timestamp, name, email, message]);
  } catch (e) {
    // Silently fail — email is the primary function
    Logger.log("Sheet logging failed: " + e.toString());
  }
}
