// const config = require("../configs/configs");
const admin = require("firebase-admin");

const { getFirestore } = require("firebase-admin/firestore");

// Para guardar un objeto en el archivo .env hay que tratarlo como JSON
const configs = JSON.parse(process.env.CONFIGS);

admin.initializeApp({
  credential: admin.credential.cert(configs.firebase),
});

const db = getFirestore();

module.exports = { db };
