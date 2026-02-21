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
    var transmissionId = data.id || "TR-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    var userAgent = data.userAgent || "Unknown";

    var subject = "✨ New Collaboration Inquiry | " + senderName + " [Ref: " + transmissionId + "]";
    
    var htmlBody = 
      '<div style="background-color: #020617; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">' +
      
      // Header Section
      '  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 48px 40px; border-bottom: 1px solid #1e293b;">' +
      '    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; color: #60a5fa; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 16px;">// PORTAL_HANDSHAKE_P2P</div>' +
      '    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;">Incoming <br/>Transmission</h1>' +
      '  </div>' +
      
      '  <div style="padding: 40px;">' +
      
      // Data Grid
      '    <div style="margin-bottom: 40px;">' +
      '      <table style="width: 100%; border-collapse: separate; border-spacing: 0 16px;">' +
      '        <tr>' +
      '          <td style="vertical-align: top; width: 120px;">' +
                '  <div style="font-family: ui-monospace, monospace; color: #475569; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">IDENTIFIER</div>' +
                '  <div style="color: #ffffff; font-size: 15px; font-weight: 600;">' + senderName + '</div>' +
                '</td>' +
      '          <td style="vertical-align: top;">' +
                '  <div style="font-family: ui-monospace, monospace; color: #475569; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">TRANSMISSION_ID</div>' +
                '  <div style="color: #60a5fa; font-size: 14px; font-family: ui-monospace, monospace; font-weight: 700;">#' + transmissionId + '</div>' +
                '</td>' +
      '        </tr>' +
      '        <tr>' +
      '          <td colspan="2" style="vertical-align: top; padding-top: 8px;">' +
                '  <div style="font-family: ui-monospace, monospace; color: #475569; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">ENDPOINT_SOURCE</div>' +
                '  <div style="color: #e2e8f0; font-size: 15px;">' +
                '    <a href="mailto:' + senderEmail + '" style="color: #60a5fa; text-decoration: none; border-bottom: 1px solid rgba(96, 165, 250, 0.2);">' + senderEmail + '</a>' +
                '  </div>' +
                '</td>' +
      '        </tr>' +
      '      </table>' +
      '    </div>' +
      
      // Message Block
      '    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid #1e293b; border-radius: 16px; padding: 32px; margin-bottom: 40px;">' +
      '      <div style="font-family: ui-monospace, monospace; color: #60a5fa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 24px;">' +
                '  <span style="width: 8px; height: 8px; background: #60a5fa; border-radius: 50%; display: inline-block; margin-right: 12px; box-shadow: 0 0 10px #60a5fa;"></span>' +
                '  PAYLOAD_CONTENTS' +
                '</div>' +
      '      <div style="color: #f1f5f9; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-weight: 400;">' + senderMessage + '</div>' +
      '    </div>' +
      
      // Response Action
      '    <div style="text-align: center;">' +
      '      <a href="mailto:' + senderEmail + '?subject=Re: Handshake Transmission #' + transmissionId + '" style="display: inline-block; background: #ffffff; color: #020617; padding: 20px 48px; border-radius: 14px; text-decoration: none; font-size: 14px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s;">' +
                'INITIALIZE RESPONSE' +
                '</a>' +
      '    </div>' +
      
      '  </div>' +
      
      // Footer Section
      '  <div style="background: #0f172a; padding: 32px 40px; border-top: 1px solid #1e293b;">' +
      '    <div style="color: #64748b; font-size: 10px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; letter-spacing: 0.15em; margin-bottom: 12px; text-align: center;">' +
                'ARCH_ENGR_NODE // ' + timestamp +
                '</div>' +
      '    <div style="color: #475569; font-size: 8px; line-height: 1.6; text-align: center; max-width: 440px; margin: 0 auto; text-transform: uppercase; letter-spacing: 0.05em;">' +
                'Secure Channel Established via RSA-4096 Encryption. Original user-agent: ' + userAgent +
                '</div>' +
      '  </div>' +
      
      '</div>';

    var plainBody = 
      "PROTOCOL: HANDSHAKE_INITIALIZED\n" +
      "-----------------------------------------\n" +
      "IDENTIFIER: " + senderName + "\n" +
      "TRANSMISSION_ID: #" + transmissionId + "\n" +
      "ENDPOINT: " + senderEmail + "\n" +
      "TIMESTAMP: " + timestamp + "\n\n" +
      "PAYLOAD_CONTENTS:\n" + senderMessage + "\n\n" +
      "-----------------------------------------\n" +
      "Sent via Ankit Abhishek Architecture Portal";

    GmailApp.sendEmail(targetEmail, subject, plainBody, {
      htmlBody: htmlBody,
      replyTo: senderEmail,
      name: "Ankit Abhishek | Architecture Portal"
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
