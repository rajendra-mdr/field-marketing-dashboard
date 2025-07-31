// Enhanced Google Apps Script with proper CORS support and error handling
// Copy this code to your Google Apps Script editor

// Global configuration
const SHEET_NAME = 'Field Marketing Data'; // Your Google Sheet name
const DEBUG_MODE = true; // Set to false in production

function log(message) {
  if (DEBUG_MODE) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }
}

function setCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}

function doPost(e) {
  log('POST request received');
  
  try {
    // Set CORS headers
    const headers = setCorsHeaders();
    
    // Check if we have post data
    if (!e || !e.postData || !e.postData.contents) {
      log('No post data received');
      throw new Error('No post data received');
    }
    
    // Parse the incoming data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
      log(`Parsed data: ${JSON.stringify(data)}`);
    } catch (parseError) {
      log(`JSON parse error: ${parseError.toString()}`);
      log(`Raw post data: ${e.postData.contents}`);
      throw new Error(`Invalid JSON: ${parseError.toString()}`);
    }
    
    log(`Action: ${data.action}`);
    
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getActiveSheet();
    
    if (data.action === 'add') {
      // Validate required fields
      if (!data.data['Officer Name'] || !data.data['Date']) {
        throw new Error('Officer Name and Date are required fields');
      }
      
      const rowData = [
        data.data.Date || '',
        data.data['Officer Name'] || '',
        data.data['Planned Areas'] || '',
        data.data['Actual Areas'] || '',
        data.data['Doctors Visited'] || '',
        data.data['Pharmacies Visited'] || '',
        data.data['Orders'] || '',
        data.data['Returns'] || '',
        data.data['Notes'] || '',
        data.data['Timestamp'] || new Date().toISOString()
      ];
      
      // Append the row
      sheet.appendRow(rowData);
      log('Row added successfully');
      
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          message: 'Entry added successfully',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error(`Unknown action: ${data.action}`);
    }
  } catch (error) {
    log(`Error in doPost: ${error.toString()}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  log('GET request received');
  
  try {
    // Check if this is an add action
    if (e && e.parameter && e.parameter.action === 'add') {
      log('Add action detected in GET request');
      
      // Parse the data
      let data;
      try {
        data = JSON.parse(e.parameter.data);
        log(`Parsed data: ${JSON.stringify(data)}`);
      } catch (parseError) {
        log(`JSON parse error: ${parseError.toString()}`);
        throw new Error(`Invalid JSON: ${parseError.toString()}`);
      }
      
      // Get the spreadsheet and sheet
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getActiveSheet();
      
      // Validate required fields
      if (!data['Officer Name'] || !data['Date']) {
        throw new Error('Officer Name and Date are required fields');
      }
      
      const rowData = [
        data.Date || '',
        data['Officer Name'] || '',
        data['Planned Areas'] || '',
        data['Actual Areas'] || '',
        data['Doctors Visited'] || '',
        data['Pharmacies Visited'] || '',
        data['Orders'] || '',
        data['Returns'] || '',
        data['Notes'] || '',
        data['Timestamp'] || new Date().toISOString()
      ];
      
      // Append the row
      sheet.appendRow(rowData);
      log('Row added successfully via GET');
      
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: true, 
          message: 'Entry added successfully',
          timestamp: new Date().toISOString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Regular GET request to fetch data
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getActiveSheet();
    
    // Get all data
    const dataRange = sheet.getDataRange();
    const data = dataRange.getValues();
    
    if (data.length === 0) {
      log('No data found in sheet');
      return ContentService
        .createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get headers (first row)
    const headers_row = data[0];
    log(`Headers: ${headers_row.join(', ')}`);
    
    // Get data rows (skip header row)
    const rows = data.slice(1);
    log(`Found ${rows.length} data rows`);
    
    // Convert to objects
    const result = rows.map((row, index) => {
      const obj = {};
      headers_row.forEach((header, colIndex) => {
        obj[header] = row[colIndex] || '';
      });
      return obj;
    });
    
    log(`Returning ${result.length} entries`);
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    log(`Error in doGet: ${error.toString()}`);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  log('OPTIONS request received');
  
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test endpoint to verify the script is working
function doTest(e) {
  log('TEST request received');
  
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script is working',
      timestamp: new Date().toISOString(),
      postData: e ? (e.postData ? e.postData.contents : 'No postData') : 'No event object'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify setup
function testSetup() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getActiveSheet();
    
    log(`Spreadsheet ID: ${spreadsheet.getId()}`);
    log(`Sheet name: ${sheet.getName()}`);
    log(`Sheet URL: ${spreadsheet.getUrl()}`);
    
    const dataRange = sheet.getDataRange();
    const data = dataRange.getValues();
    
    log(`Total rows: ${data.length}`);
    log(`Total columns: ${data.length > 0 ? data[0].length : 0}`);
    
    if (data.length > 0) {
      log(`Headers: ${data[0].join(', ')}`);
    }
    
    return {
      success: true,
      spreadsheetId: spreadsheet.getId(),
      sheetName: sheet.getName(),
      totalRows: data.length,
      totalColumns: data.length > 0 ? data[0].length : 0
    };
  } catch (error) {
    log(`Test setup error: ${error.toString()}`);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Function to create the sheet structure if it doesn't exist
function createSheetStructure() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    // Define headers
    const headers = [
      'Date',
      'Officer Name',
      'Planned Areas',
      'Actual Areas',
      'Doctors Visited',
      'Pharmacies Visited',
      'Orders',
      'Returns',
      'Notes',
      'Timestamp'
    ];
    
    // Set headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format header row
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#4285f4')
      .setFontColor('white');
    
    // Auto-resize columns
    headers.forEach((_, index) => {
      sheet.autoResizeColumn(index + 1);
    });
    
    log('Sheet structure created successfully');
    return { success: true, message: 'Sheet structure created' };
  } catch (error) {
    log(`Error creating sheet structure: ${error.toString()}`);
    return { success: false, error: error.toString() };
  }
}

 