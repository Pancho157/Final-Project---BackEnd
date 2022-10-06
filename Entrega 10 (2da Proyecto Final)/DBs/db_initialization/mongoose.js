const mongoose = require("mongoose");

try {
  const connection = await mongoose
    .createConnection("mongodb://localhost:27017/ecommerce")
    .asPromise();
} catch (err) {
  return console.log(`Error al conectar a Mongo: ${err}`);
}
