const mongoose = require("mongoose");

function connectToMongo() {
  mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}

module.exports = { connectToMongo };
