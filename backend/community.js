const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const axios = require('axios');
const cron = require('node-cron');

// Export fetchAndStoreData
module.exports = { fetchAndStoreData };

require('dotenv').config();

// Firebase initialize using serviceAccountKey.json
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const app = express();
app.use(bodyParser.json());

// Google Spreadsheet ID and API Key from .env
const spreadsheetId = process.env.COMMUNITY_SPREADSHEET_ID; // Set this in .env
const apiKey = process.env.API_KEY; // Set this in .env

// Validate environment variables
if (!spreadsheetId || !apiKey) {
  console.error('🔥 COMMUNITY_SPREADSHEET_ID or API_KEY is not set in .env!');
  process.exit(1);
}

// Fetch data from Google Spreadsheet
async function fetchSpreadsheetData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1?key=${apiKey}`;

  try {
    const response = await axios.get(url);

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.error('No data found in the spreadsheet.');
      return [];
    }

    const [headers, ...data] = rows;
    const formattedData = data.map((row) =>
      headers.reduce((acc, header, index) => {
        acc[header] = row[index];
        return acc;
      }, {})
    );

    return formattedData;
  } catch (error) {
    console.error('Error fetching spreadsheet data:', error.message);
    return [];
  }
}

async function pushDataToFirestore(data) {
  try {
    const collectionRef = firestore.collection('communityPrediction');
    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    for (const entry of data) {
      if (!entry.username || typeof entry.username !== 'string' || entry.username.trim() === '') {
        console.error('Skipping invalid entry:', entry);
        continue;
      }
      const docRef = collectionRef.doc(entry.username.trim());

      await docRef.set({
        ...entry,
        lastUpdated: timestamp,
      });
    }
    console.log('Data successfully pushed to Firestore.');
  } catch (error) {
    console.error('Error pushing data to Firestore:', error.message);
  }
}

// Fetch and store data (main function)
async function fetchAndStoreData() {
  const data = await fetchSpreadsheetData();
  if (data.length > 0) {
    await pushDataToFirestore(data);
  } else {
    console.error('No data to push to Firestore.');
  }
}

// Schedule a cron job to update data periodically (e.g., daily at midnight)
// cron.schedule('0 0 * * *', () => {
//   console.log('Running scheduled job: Fetch and Store Data');
//   fetchAndStoreData();
// });

// Endpoint to manually trigger data fetch and store
app.get('/update-stocks', async (req, res) => {
  try {
    await fetchAndStoreData();
    res.send('Stock data successfully updated.');
  } catch (error) {
    console.error('Error updating stock data:', error.message);
    res.status(500).send('Failed to update stock data.');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});