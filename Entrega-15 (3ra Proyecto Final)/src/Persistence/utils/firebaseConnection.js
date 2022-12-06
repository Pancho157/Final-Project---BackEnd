const admin = require("firebase-admin");
// Para guardar un objeto en el archivo .env hay que tratarlo como JSON
const configs = JSON.parse(process.env.CONFIGS);

admin.initializeApp({
  credential: admin.credential.cert(configs.firebase),
});

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

module.exports = { db };
