require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_PRIVATE_KEY); // Secret als JSON
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
