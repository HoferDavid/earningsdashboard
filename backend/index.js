const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const axios = require('axios'); // For HTTP-Requests
const cron = require('node-cron');
const serviceAccount = require('./serviceAccountKey.json');
const stocks = require('./stocks.json');


require('dotenv').config();


// Firebase initialize
console.log('serviceAccount:', serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const firestore = admin.firestore();
const app = express();
app.use(bodyParser.json());


// Google Spreadsheet ID and API Key
const spreadsheetId = process.env.SPREADSHEET_ID;
const apiKey = process.env.API_KEY;


function convertToAbsolute(value, format) {
  // Remove thousands separator
  const numericValue = parseFloat(value.replace(/,/g, ''));

  // Select the multiplier based on the format
  let multiplier = 1;
  if (format === 'millions') {
    multiplier = 1e3;
  } else if (format === 'billions') {
    multiplier = 1e6;
  }

  return numericValue * multiplier;
}


// Function, to load Data from Google Spreadsheet
async function getStockOverviewData(sheetName, revenueRow, quarterRow, netIncomeRow, grossMarginRow) {
  const revenueRange = `${sheetName}!A${revenueRow}:BZ${revenueRow}`;
  const quarterRange = `${sheetName}!A${quarterRow}:BZ${quarterRow}`;
  const netIncomeRange = `${sheetName}!A${netIncomeRow}:BZ${netIncomeRow}`;
  const grossMarginRange = `${sheetName}!A${grossMarginRow}:BZ${grossMarginRow}`;

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${revenueRange}&ranges=${quarterRange}&ranges=${netIncomeRange}&ranges=${grossMarginRange}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.valueRanges;
  } catch (error) {
    console.error('Error while retrieving data:', error);
  }
}


// Load Google Spreadsheet Data into Firestore for all stocks
async function syncSpreadsheetToFirestore() {
  try {
    console.log('Starting synchronization...');

    for (const stockName in stocks) {
      const stock = stocks[stockName];
      const sheetName = `$${stock.ticker}`;
      const revenueRow = stock.revenueRow;
      const quarterRow = stock.quarterRow;
      const netIncomeRow = stock.netIncomeRow;
      const grossMarginRow = stock.grossMarginRow;
      const numbersFormat = stock.numbersFormat; // Read format from stocks.json
    
      console.log(`Synchronizing ${stockName}...`);
    
      const stockData = await getStockOverviewData(sheetName, revenueRow, quarterRow, netIncomeRow, grossMarginRow);
      
      if (stockData) {
        // Data cleansing and conversion
        const revenueData = stockData[0].values[0].map(value => convertToAbsolute(value, numbersFormat));
        const quarterData = stockData[1].values[0]; // No conversion required
        const netIncomeData = stockData[2].values[0].map(value => convertToAbsolute(value, numbersFormat));
        const grossMarginData = stockData[3].values[0]; // No conversion required
    
        // Save in Firestore
        const stockRef = firestore.collection('stocks').doc(stock.ticker);
        await stockRef.set({
          name: stockName,
          ticker: stock.ticker,
          revenue: revenueData,
          quarter: quarterData,
          netIncome: netIncomeData,
          grossMargin: grossMarginData,
          url: stock.url,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
    
        console.log(`Data for ${stockName} saved.`);
      } else {
        console.error(`Failed to fetch data for ${stockName}`);
      }
    }
    
    console.log('Synchronization complete.');

  } catch (error) {
    console.error('Error loading data:', error);
  }
}


// API route for manual synchronization
app.post('/api/sync', async (req, res) => {
  console.log('Sync-Route aufgerufen');
  await syncSpreadsheetToFirestore();
  res.send('Spreadsheet synchronized.');
});


// Cronjob every 24 hours
// cron.schedule('0 0 * * *', syncSpreadsheetToFirestore);


// Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`);
});