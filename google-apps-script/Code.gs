/**
 * Google Apps Script — Portfolio Contact Form Email Handler
 * 
 * SETUP:
 * 1. Go to https://script.google.com → New Project
 * 2. Delete the default code and paste this entire file
 * 3. Services (left sidebar) → Click "+" → Add "Google Calendar API" (v3)
 * 4. Click Deploy → New Deployment
 * 5. Select type: "Web app"
 * 6. Set "Execute as": Me (your Google account)
 * 7. Set "Who has access": Anyone
 * 8. Click Deploy → Authorize → Copy the Web App URL
 * 9. Paste that URL into your .env file as VITE_APPS_SCRIPT_URL
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.getDataAsString());
    
    var senderName = data.identifier || "Unknown";
    var senderEmail = data.email || "No email provided";
    var senderMessage = data.message || "No message";
    var targetEmail = data.targetEmail || "ankitabhishek1005@gmail.com";
    var targetEmails = Array.isArray(targetEmail) ? targetEmail : [targetEmail];
    var timestamp = data.timestamp || new Date().toISOString();
    var transmissionId = data.id || "TR-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    var userAgent = data.userAgent || "Unknown";
    
    // Meeting Data
    var isMeetingRequest = data.meetingDate && data.meetingTime;
    var meetUrl = null;
    var meetingInfoString = "";

    if (isMeetingRequest) {
      try {
        // Parse date and time (Example: "Mar 15, 2026 @ 10:00 AM")
        var dateTimeStr = data.meetingDate + " " + data.meetingTime;
        var startTime = new Date(dateTimeStr);
        var endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour duration

        // Create Calendar Event with Google Meet link
        var calendarId = 'primary';
        var resource = {
          summary: 'Portfolio Collaboration: ' + senderName,
          description: 'Collaboration meeting scheduled via portfolio portal.\n\nMessage: ' + senderMessage + '\n\nRef: ' + transmissionId,
          start: { dateTime: startTime.toISOString() },
          end: { dateTime: endTime.toISOString() },
          attendees: [
            { email: senderEmail },
            { email: targetEmail }
          ],
          conferenceData: {
            createRequest: {
              requestId: Utilities.getUuid(),
              conferenceSolutionKey: { type: 'hangoutsMeet' }
            }
          }
        };

        var event = Calendar.Events.insert(resource, calendarId, { conferenceDataVersion: 1 });
        meetUrl = event.conferenceData.entryPoints[0].uri;
        meetingInfoString = "\n[ SCHEDULED_MEETING ]\nDATE: " + data.meetingDate + "\nTIME: " + data.meetingTime + "\nMEET_LINK: " + meetUrl + "\n";
      } catch (calErr) {
        Logger.log("Calendar error: " + calErr.toString());
        meetingInfoString = "\n[ CALENDAR_SYNC_FAILED ]\nDATE: " + data.meetingDate + "\nTIME: " + data.meetingTime + "\n(Check Apps Script configuration for Calendar API)\n";
      }
    }

    var subject = data.subject || (isMeetingRequest ? "[MEETING] Meeting Request | " : "[CONTACT] New Message | ") + senderName + " (Ref: " + transmissionId + ")";
    
    var htmlBody = "";
    
    if (data.isHtml) {
      // If isHtml is true, use the message directly as the HTML body
      htmlBody = data.message;
    } else {
      // Fallback to the premium themed wrapper for plain text messages
      htmlBody = 
        '<div style="background-color: #020617; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">' +
        // Header Section
        '  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); padding: 48px 40px; border-bottom: 1px solid #1e293b;">' +
        '    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; color: #60a5fa; font-size: 11px; font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 16px;">// PORTAL_HANDSHAKE_P2P</div>' +
        '    <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;">Incoming <br/>' + (isMeetingRequest ? 'Meeting Request' : 'Message') + '</h1>' +
        '  </div>' +
        
        '  <div style="padding: 40px;">' +
        
        (isMeetingRequest ? 
        '    <div style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 24px; padding: 32px; margin-bottom: 40px;">' +
        '      <div style="color: #60a5fa; font-size: 10px; font-family: ui-monospace, monospace; font-weight: 800; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 16px;">PROPOSED_SYNC_WINDOW</div>' +
        '      <div style="color: #ffffff; font-size: 20px; font-weight: 800; margin-bottom: 24px;">' + data.meetingDate + ' @ ' + data.meetingTime + '</div>' +
        
        '      <div style="display: table; width: 100%; border-spacing: 12px 0; margin: 0 -12px;">' +
                 (meetUrl ? 
        '        <div style="display: table-cell; width: 50%;">' +
        '          <a href="' + meetUrl + '" style="display: block; background: #3b82f6; color: #ffffff; text-align: center; padding: 14px 10px; border-radius: 12px; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">JOIN_GOOGLE_MEET</a>' +
        '        </div>' : '') +
        '        <div style="display: table-cell; width: 50%;">' +
        '          <a href="https://calendar.google.com/calendar/r" style="display: block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #ffffff; text-align: center; padding: 14px 10px; border-radius: 12px; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">RESCHEDULE / MANAGE</a>' +
        '        </div>' +
        '      </div>' +
        '    </div>' : '') +

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
        '      </table>' +
        '    </div>' +
        
        '    <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid #1e293b; border-radius: 16px; padding: 32px; margin-bottom: 40px;">' +
        '      <div style="font-family: ui-monospace, monospace; color: #60a5fa; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 24px;">' +
                  '  <span style="width: 8px; height: 8px; background: #60a5fa; border-radius: 50%; display: inline-block; margin-right: 12px; box-shadow: 0 0 10px #60a5fa;"></span>' +
                  '  PAYLOAD_CONTENTS' +
                  '</div>' +
        '      <div style="color: #f1f5f9; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-weight: 400;">' + senderMessage + '</div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    }

    var plainBody = data.plainMessage || 
      "PROTOCOL: HANDSHAKE_INITIALIZED\n" +
      "-----------------------------------------\n" +
      "IDENTIFIER: " + senderName + "\n" +
      "TRANSMISSION_ID: #" + transmissionId + "\n" +
      "ENDPOINT: " + senderEmail + "\n" +
      "TIMESTAMP: " + timestamp + "\n" +
      meetingInfoString + "\n" +
      "PAYLOAD_CONTENTS:\n" + senderMessage + "\n\n" +
      "-----------------------------------------\n" +
      "Sent via Ankit Abhishek Architecture Portal";

    for (var i = 0; i < targetEmails.length; i++) {
      var currentTarget = targetEmails[i];
      GmailApp.sendEmail(currentTarget, subject, plainBody, {
        htmlBody: htmlBody,
        replyTo: senderEmail,
        name: "Ankit Abhishek | Architecture Portal"
      });
    }

    logToSheet(senderName, senderEmail, senderMessage, timestamp, meetUrl);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Email sent successfully",
        meetUrl: meetUrl
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Portfolio contact form handler is active." }))
    .setMimeType(ContentService.MimeType.JSON);
}

function logToSheet(name, email, message, timestamp, meetUrl) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return;
    
    var sheet = ss.getSheetByName("Contact Submissions");
    if (!sheet) {
      sheet = ss.insertSheet("Contact Submissions");
      sheet.appendRow(["Timestamp", "Name", "Email", "Message", "Meet Link"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold").setBackground("#1e40af").setFontColor("#ffffff");
    }
    sheet.appendRow([timestamp, name, email, message, meetUrl || "N/A"]);
  } catch (e) {
    Logger.log("Sheet logging failed: " + e.toString());
  }
}
