const mongoose = require("mongoose");

function connectToMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

mongoose.set("strictQuery", false);

module.exports = { connectToMongo };
