const mongoose = require("mongoose");

function connectToMongo() {
  mongoose.connect("mongodb://localhost/ecommerce", () => {
    console.log("Connected");
  });
}

module.exports = { connectToMongo };
