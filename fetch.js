require('dotenv').config();
const admin = require('firebase-admin');
const { fetchAndStoreData } = require('backend/community.js'); // change path
const fs = require('fs');

if (!fs.existsSync('./serviceAccountKey.json')) {
  console.error('Service Account Key file is missing!');
  process.exit(1);
}

// Firebase initialisieren
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json')),
});

fetchAndStoreData().then(() => {
  console.log('✅ Fetch & Store Job succesful.');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error while fetching:', err);
  process.exit(1);
});
