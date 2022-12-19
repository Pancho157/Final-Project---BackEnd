const admin = require("firebase-admin");
// Para guardar un objeto en el archivo .env hay que tratarlo como JSON
const configs = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(configs),
});

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

module.exports = { db };
