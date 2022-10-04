const config = require("../configs/configs");
const admin = require("firebase-admin");

const { getFirestore } = require("firebase-admin/firestore");

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = getFirestore();

module.exports = { db };
