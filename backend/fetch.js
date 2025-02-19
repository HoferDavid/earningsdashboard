require('dotenv').config();
const admin = require('firebase-admin');
const { fetchAndStoreData } = require('./community.js');

if (!process.env.FIREBASE_PRIVATE_KEY) {
  console.error('🔥 FIREBASE_PRIVATE_KEY is not set!');
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY); // Secret als JSON
} catch (error) {
  console.error('❌ Failed to parse FIREBASE_PRIVATE_KEY:', error);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

fetchAndStoreData().then(() => {
  console.log('✅ Fetch & Store Job successful.');
  process.exit(0);
}).catch(err => {
  console.error('❌ Error while fetching:', err);
  process.exit(1);
});