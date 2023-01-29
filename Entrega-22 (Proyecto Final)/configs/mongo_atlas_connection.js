const mongoose = require("mongoose");

function connectToMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to MongoDB successfully");
}

mongoose.set("strictQuery", false);

module.exports = { connectToMongo };
