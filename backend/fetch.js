require('dotenv').config();
const admin = require('firebase-admin');
const { fetchAndStoreData } = require('./community.js');

// Load Firebase key from the JSON file
const serviceAccount = require('./serviceAccountKey.json');

// Only initialize Firebase if it is not yet running
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.log('Firebase app already initialized.');
}

fetchAndStoreData()
  .then(() => {
    console.log('✅ Fetch & Store Job successful.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error while fetching:', err);
    process.exit(1);
  });
