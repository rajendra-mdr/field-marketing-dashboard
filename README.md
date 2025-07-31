# Field Marketing Dashboard

A comprehensive, modern field marketing dashboard for healthcare professionals. Built with React, Tailwind CSS, and Google Sheets integration for seamless data management. **Runs directly on GitHub Pages without requiring any build process.**

## 🚀 Live Demo

**Access the dashboard directly at:** https://rajendra-mdr.github.io/field-marketing-dashboard/

## 🚀 Features

### Core Functionality
- **Daily Activity Entry**: Comprehensive form for recording field marketing activities
- **Data Visualization**: Charts and analytics for performance insights
- **Google Sheets Integration**: Real-time data synchronization
- **Offline Support**: Work without internet connection
- **Mobile Responsive**: Optimized for all device sizes

### Enhanced Features
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **Form Validation**: Comprehensive input validation with helpful error messages
- **Data Caching**: Improved performance with intelligent caching
- **Error Handling**: Robust error handling and user feedback
- **Analytics Dashboard**: Performance metrics and reporting
- **Export Functionality**: Export data to various formats

## 🛠️ Technology Stack

- **Frontend**: React 18 (via CDN)
- **Styling**: Tailwind CSS (via CDN)
- **Charts**: Recharts (via CDN)
- **Icons**: Lucide React (via CDN)
- **Data Storage**: Google Sheets API
- **Deployment**: GitHub Pages

## 📦 Installation & Setup

### For Users (No Installation Required)
Simply visit: https://rajendra-mdr.github.io/field-marketing-dashboard/

### For Developers

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajendra-mdr/field-marketing-dashboard.git
   cd field-marketing-dashboard
   ```

2. **Open locally**
   ```bash
   # Using Python (if available)
   python -m http.server 8000
   
   # Using Node.js (if available)
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Configure Google Sheets**
   - Create a new Google Sheet
   - Set up Google Apps Script (see [Google Sheets Setup](#google-sheets-setup))
   - Update the configuration in `index.html`

## 🔧 Configuration

### Quick Setup Guide
For detailed step-by-step instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)

### Google Sheets Setup

1. **Create Google Sheet**
   - Create a new Google Sheet with the following columns:
     - Date
     - Officer Name
     - Planned Areas
     - Actual Areas
     - Doctors Visited
     - Pharmacies Visited
     - Orders
     - Returns
     - Notes
     - Timestamp

2. **Set up Google Apps Script**
   ```javascript
   function doPost(e) {
     try {
       const data = JSON.parse(e.postData.contents);
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       
       if (data.action === 'add') {
         const rowData = [
           data.data.Date,
           data.data['Officer Name'],
           data.data['Planned Areas'],
           data.data['Actual Areas'],
           data.data['Doctors Visited'],
           data.data['Pharmacies Visited'],
           data.data['Orders'],
           data.data['Returns'],
           data.data['Notes'],
           data.data['Timestamp']
         ];
         
         sheet.appendRow(rowData);
         return ContentService.createTextOutput(JSON.stringify({ success: true }));
       }
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ 
         success: false, 
         error: error.toString() 
       }));
     }
   }

   function doGet(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
       const data = sheet.getDataRange().getValues();
       const headers = data[0];
       const rows = data.slice(1);
       
       const result = rows.map(row => {
         const obj = {};
         headers.forEach((header, index) => {
           obj[header] = row[index];
         });
         return obj;
       });
       
       return ContentService.createTextOutput(JSON.stringify(result))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (error) {
       return ContentService.createTextOutput(JSON.stringify({ 
         error: error.toString() 
       }));
     }
   }
   ```

3. **Deploy and Update Configuration**
   - Deploy the script as a web app
   - Update `GOOGLE_APPS_SCRIPT_URL` in `index.html`

### Environment Configuration

Update the configuration in `index.html`:

```javascript
const CONFIG = {
    GOOGLE_APPS_SCRIPT_URL: 'YOUR_GOOGLE_APPS_SCRIPT_URL',
    SHEET_ID: 'YOUR_GOOGLE_SHEET_ID',
    APP_NAME: 'Field Marketing Dashboard',
    COMPANY_NAME: 'Stellar Healthcare Pvt. Ltd',
    VERSION: '2.0.0'
};
```

## 📁 Project Structure

```
field-marketing-dashboard/
├── index.html                    # Main application file
├── test-api.html                 # API testing tool
├── google-apps-script-cors-fix.js # Google Apps Script code
├── SETUP_GUIDE.md               # Detailed setup instructions
├── README.md                    # Documentation
└── .gitignore                   # Git ignore file
```

## 🎯 Usage

### Testing Your Setup
1. Open `test-api.html` in your browser
2. Enter your Google Apps Script URL
3. Test both GET and POST requests
4. Verify responses are successful

### Adding New Entry
1. Navigate to the "New Entry" tab
2. Fill in the required fields (Date, Officer Name)
3. Add doctors visited with their details
4. Add pharmacies visited
5. Record any orders or returns
6. Add additional notes
7. Click "Save Entry"

### Viewing Entries
1. Navigate to the "View Entries" tab
2. Browse through all submitted entries
3. Use filters to find specific data
4. Export data if needed

### Analytics Dashboard
1. View performance metrics
2. Analyze trends over time
3. Generate reports

## 🔍 API Reference

### Data Models

#### Entry
```javascript
{
  id: number,
  date: string,
  officerName: string,
  plannedAreas: string,
  actualAreas: string,
  doctorsVisited: Doctor[],
  pharmaciesVisited: Pharmacy[],
  orders: Order[],
  returns: Return[],
  notes: string,
  timestamp: string
}
```

#### Doctor
```javascript
{
  name: string,
  location: string,
  specialty: string,
  status: 'visited' | 'no_call' | 'not_available'
}
```

#### Pharmacy
```javascript
{
  name: string,
  location: string,
  status: 'visited' | 'no_call' | 'not_available'
}
```

### API Methods

#### `apiService.getEntries()`
Fetches all entries from Google Sheets.

#### `apiService.addEntry(entryData)`
Adds a new entry to Google Sheets.

#### `apiService.syncOfflineData()`
Syncs any offline data when connection is restored.

## 🎨 Customization

### Styling
The project uses Tailwind CSS. You can customize the styles by modifying the CSS classes in `index.html`.

### Components
All components are in the single `index.html` file and can be easily customized.

### Validation
Update validation rules in the `validateEntry` function to match your business requirements.

## 🚀 Deployment

### GitHub Pages (Current)
The project is already deployed on GitHub Pages and accessible at:
https://rajendra-mdr.github.io/field-marketing-dashboard/

### Manual Deployment
1. Upload the `index.html` file to any web server
2. Configure your server to serve the file
3. Update the Google Apps Script URL in the configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test locally by opening `index.html` in a browser
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: rajendra@example.com
- Documentation: [Wiki](https://github.com/rajendra-mdr/field-marketing-dashboard/wiki)

## 🔄 Changelog

### v2.0.0 (Current)
- Enhanced UI with better animations
- Improved form validation
- Added analytics dashboard with charts
- Better error handling and user feedback
- Mobile responsive improvements
- Data caching for better performance

### v1.0.0
- Initial release
- Basic CRUD operations
- Google Sheets integration
- Modern UI with Tailwind CSS
- Mobile responsive design

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Recharts](https://recharts.org/) - Chart library
- [Lucide](https://lucide.dev/) - Icon library
- [GitHub Pages](https://pages.github.com/) - Hosting platform

---

**Built with ❤️ by Rajendra MDR**

**Live Demo:** https://rajendra-mdr.github.io/field-marketing-dashboard/