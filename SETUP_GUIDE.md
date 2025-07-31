# Google Sheets Integration Setup Guide

This guide will help you fix the Google Sheets integration issues with your Field Marketing Dashboard.

## 🚨 Common Issues & Solutions

### Issue 1: CORS Errors
**Symptoms**: Browser console shows CORS errors, data doesn't load
**Solution**: Use the updated Google Apps Script with proper CORS headers

### Issue 2: "Using demo data" message
**Symptoms**: Dashboard shows demo data instead of real data
**Solution**: Check Google Apps Script deployment and permissions

### Issue 3: Data not saving
**Symptoms**: Form submission fails, no error message
**Solution**: Verify Google Apps Script URL and sheet permissions

## 📋 Step-by-Step Setup

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Field Marketing Dashboard"
4. Copy the spreadsheet ID from the URL (the long string between /d/ and /edit)

### Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy the entire content from `google-apps-script-cors-fix.js`
5. Save the project with a name like "Field Marketing API"

### Step 3: Configure the Script

1. In the Google Apps Script editor, update these variables:
   ```javascript
   const SHEET_NAME = 'Sheet1'; // Change to match your sheet name
   const DEBUG_MODE = true; // Keep true for debugging
   ```

2. Make sure the script is connected to your Google Sheet:
   - Click on the spreadsheet icon in the Apps Script editor
   - Select your "Field Marketing Dashboard" spreadsheet
   - Click "Add"

### Step 4: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
   - **Execute as**: "Me" (your Google account)
   - **Who has access**: "Anyone" (for testing) or "Anyone with Google account" (for production)
4. Click "Deploy"
5. **Copy the Web App URL** - you'll need this for the next step

### Step 5: Update Dashboard Configuration

1. Open `index.html` in a text editor
2. Find the CONFIG section (around line 85)
3. Update the `GOOGLE_APPS_SCRIPT_URL` with your Web App URL:
   ```javascript
   const CONFIG = {
       GOOGLE_APPS_SCRIPT_URL: 'YOUR_WEB_APP_URL_HERE',
       SHEET_ID: 'YOUR_SPREADSHEET_ID_HERE',
       // ... other config
   };
   ```

### Step 6: Test the Setup

1. Run the `testSetup()` function in Google Apps Script:
   - Go to your Apps Script project
   - Select `testSetup` from the function dropdown
   - Click the play button
   - Check the logs for any errors

2. Test the API directly:
   - Open your Web App URL in a browser
   - You should see JSON data or an empty array `[]`

### Step 7: Create Sheet Structure

1. In Google Apps Script, run the `createSheetStructure()` function
2. This will create the proper headers in your Google Sheet

## 🔧 Troubleshooting

### Check Browser Console
1. Open your dashboard in a browser
2. Press F12 to open Developer Tools
3. Go to the Console tab
4. Look for any error messages

### Common Error Messages

**"Failed to fetch"**
- Check if the Google Apps Script URL is correct
- Verify the script is deployed as a web app
- Make sure "Who has access" is set to "Anyone"

**"CORS policy" errors**
- The updated script includes proper CORS headers
- Make sure you're using the latest version from `google-apps-script-cors-fix.js`

**"Using demo data"**
- Check the browser console for specific error messages
- Verify the Google Apps Script URL is accessible
- Test the URL directly in a browser

### Testing the API

Test your Google Apps Script URL directly:

1. **GET request** (to fetch data):
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

2. **POST request** (to add data):
   ```bash
   curl -X POST "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec" \
        -H "Content-Type: application/json" \
        -d '{
          "action": "add",
          "data": {
            "Date": "2024-01-15",
            "Officer Name": "Test User",
            "Planned Areas": "Test Area",
            "Actual Areas": "Test Area",
            "Doctors Visited": "",
            "Pharmacies Visited": "",
            "Orders": "",
            "Returns": "",
            "Notes": "Test entry",
            "Timestamp": "2024-01-15T10:00:00Z"
          }
        }'
   ```

## 🔒 Security Considerations

### For Production Use:
1. Set "Who has access" to "Anyone with Google account"
2. Implement user authentication
3. Add rate limiting to prevent abuse
4. Set `DEBUG_MODE = false` in the script

### For Testing:
1. "Anyone" access is fine for initial testing
2. Keep `DEBUG_MODE = true` to see detailed logs

## 📞 Getting Help

If you're still having issues:

1. **Check the logs**: In Google Apps Script, go to "Executions" to see detailed logs
2. **Test step by step**: Follow each step in this guide carefully
3. **Verify URLs**: Make sure all URLs are correct and accessible
4. **Check permissions**: Ensure your Google account has access to both the sheet and script

## 🎯 Quick Test Checklist

- [ ] Google Sheet created and accessible
- [ ] Google Apps Script deployed as web app
- [ ] Web App URL copied correctly
- [ ] Dashboard configuration updated
- [ ] Sheet structure created
- [ ] API responds to GET requests
- [ ] API accepts POST requests
- [ ] Dashboard loads real data (not demo data)

Once all items are checked, your Google Sheets integration should work properly! 