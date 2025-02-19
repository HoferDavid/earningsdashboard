require('dotenv').config();
const admin = require('firebase-admin');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const stocks = require('./stocks.json');

// Firebase-Credentials aus Umgebungsvariable parsen
let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
} catch (error) {
  console.error('❌ Fehler beim Parsen des FIREBASE_PRIVATE_KEY:', error);
  process.exit(1);
}

// Firebase initialisieren, falls noch nicht geschehen
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const firestore = admin.firestore();
const app = express();
app.use(bodyParser.json());

const spreadsheetId = process.env.SPREADSHEET_ID;
const apiKey = process.env.API_KEY;

// Funktion zur Datenabfrage von Google Spreadsheet
async function getStockOverviewData(sheetName, revenueRow, quarterRow, netIncomeRow, grossMarginRow) {
  const ranges = [
    `${sheetName}!A${revenueRow}:BZ${revenueRow}`,
    `${sheetName}!A${quarterRow}:BZ${quarterRow}`,
    `${sheetName}!A${netIncomeRow}:BZ${netIncomeRow}`,
    `${sheetName}!A${grossMarginRow}:BZ${grossMarginRow}`
  ];
  
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${ranges.join('&ranges=')}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.valueRanges;
  } catch (error) {
    console.error('❌ Fehler beim Abrufen der Daten:', error);
  }
}

// Funktion zur Synchronisation mit Firestore
async function syncSpreadsheetToFirestore() {
  try {
    for (const stockName in stocks) {
      const stock = stocks[stockName];
      const sheetName = `$${stock.ticker}`;

      const stockData = await getStockOverviewData(
        sheetName,
        stock.revenueRow,
        stock.quarterRow,
        stock.netIncomeRow,
        stock.grossMarginRow
      );

      if (stockData) {
        const revenueData = stockData[0].values[0];
        const quarterData = stockData[1].values[0];
        const netIncomeData = stockData[2].values[0];
        const grossMarginData = stockData[3].values[0];

        const stockRef = firestore.collection('stocks').doc(stock.ticker);
        await stockRef.set({
          name: stockName,
          revenue: revenueData,
          quarter: quarterData,
          netIncome: netIncomeData,
          grossMargin: grossMarginData,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log(`✅ Daten für ${stockName} gespeichert.`);
      } else {
        console.error(`❌ Keine Daten für ${stockName} gefunden.`);
      }
    }
    console.log('✅ Synchronisierung abgeschlossen.');
  } catch (error) {
    console.error('❌ Fehler bei der Synchronisation:', error);
  }
}

// Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
