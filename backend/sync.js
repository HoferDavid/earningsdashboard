require('dotenv').config();
const admin = require('firebase-admin');
const { syncSpreadsheetToFirestore } = require('./index.js'); // Import the function from index.js

if (!process.env.FIREBASE_PRIVATE_KEY) {
  console.error('🔥 FIREBASE_PRIVATE_KEY is not set!');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);
} catch (error) {
  console.error('❌ Failed to parse FIREBASE_PRIVATE_KEY:', error);
  process.exit(1);
}

// Only initialize Firebase if not already present
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

syncSpreadsheetToFirestore()
  .then(() => {
    console.log('✅ Sync successful.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error while syncing:', err);
    process.exit(1);
  });
