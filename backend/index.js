const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const axios = require('axios'); // For HTTP-Requests
const cron = require('node-cron');
const serviceAccount = require('./serviceAccountKey.json');
const stocks = require('./stocks.json');

require('dotenv').config();

// Firebase initialize
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const app = express();
app.use(bodyParser.json());

// Google Spreadsheet ID and API Key
const spreadsheetId = process.env.SPREADSHEET_ID;
const apiKey = process.env.API_KEY;

// Function, to load Data from Google Spreadsheet
async function getStockOverviewData(sheetName, revenueRow, quarterRow) {
    
  const revenueRange = `${sheetName}!A${revenueRow}:AZ${revenueRow}`;
  const quarterRange = `${sheetName}!A${quarterRow}:AZ${quarterRow}`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${revenueRange}&ranges=${quarterRange}&key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    return response.data.valueRanges;
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

// Load Google Spreadsheet Data into Firestore for all stocks
async function syncSpreadsheetToFirestore() {
  try {
    console.log('Starting synchronization...');

    for (const stockName in stocks) {
      const stock = stocks[stockName];
      const sheetName = `$${stock.ticker}`; // Prefix the ticker with '$'
      const revenueRow = stock.revenueRow;
      const quarterRow = stock.quarterRow;

      const stockData = await getStockOverviewData(sheetName, revenueRow, quarterRow);
      console.log(`Received data for ${stockName}:`, stockData);

      if (stockData) {
        // Save data in Firestore
        const revenueData = stockData[0].values[0];
        const quarterData = stockData[1].values[0];

        const stockRef = firestore.collection('stocks').doc(stock.ticker);
        await stockRef.set({
          name: stockName,
          ticker: stock.ticker,
          revenue: revenueData,
          quarter: quarterData,
          url: stock.url  // Add this line to save the URL
        });
        
        console.log(`Data for ${stockName} successfully saved to Firestore.`);
      } else {
        console.error(`Failed to fetch data for ${stockName}`);
      }
    }
    
    console.log('Synchronization complete.');

  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// API-Route to manual Synchronisation
app.post('/api/sync', async (req, res) => {
  await syncSpreadsheetToFirestore();
  res.send('Spreadsheet synchronisiert.');
});

// Cronjob every 24 hours
cron.schedule('0 0 * * *', syncSpreadsheetToFirestore);

// Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
