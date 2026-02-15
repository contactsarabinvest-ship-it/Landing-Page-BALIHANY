/**
 * Balihany Waitlist — Google Apps Script
 * Paste this entire file into Extensions → Apps Script in your Google Sheet.
 *
 * WEBSITE: sends GET with ?email=...&category=... (doGet runs)
 * TEST:    run testDoPost() in the editor (doPost runs)
 *
 * Sheet: "Waitlist" with columns Email | Category | Date
 */

function doGet(e) {
  var params = e && e.parameter ? e.parameter : {};
  return processRequest(params);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createResponse(400, { success: false, error: "No request body" });
    }
    var body = JSON.parse(e.postData.contents);
    return processRequest(body);
  } catch (err) {
    Logger.log("doPost error: " + err.message);
    return createResponse(500, { success: false, error: err.message || "Server error" });
  }
}

function processRequest(params) {
  var sheetName = "Waitlist";

  try {
    var email = (params.email || "").toString().trim().toLowerCase();
    var category = (params.category || "").toString().trim();

    if (!email) {
      return createResponse(400, { success: false, error: "Email is required" });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, 3).setValues([["Email", "Category", "Date"]]);
      sheet.getRange(1, 1, 1, 3).setFontWeight("bold");
    }

    sheet.appendRow([email, category, new Date()]);

    return createResponse(200, { success: true });
  } catch (err) {
    Logger.log("processRequest error: " + err.message);
    return createResponse(500, { success: false, error: err.message || "Server error" });
  }
}

function createResponse(statusCode, data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// ——— Tests (run from Apps Script editor) ——— //

function testDoPost() {
  var e = {
    postData: {
      contents: JSON.stringify({
        email: "test@example.com",
        category: "conciergeries, interiorDesigners"
      })
    }
  };
  var result = doPost(e);
  Logger.log(result.getContent());
}

function testDoGet() {
  var e = { parameter: { email: "get-test@example.com", category: "cleaningServices" } };
  var result = doGet(e);
  Logger.log(result.getContent());
}
