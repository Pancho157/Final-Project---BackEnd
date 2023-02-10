const mongoose = require("mongoose");
const { logger } = require("./logger");

function connectToMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  logger.info("Connected to MongoDB successfully");
}

mongoose.set("strictQuery", false);

module.exports = { connectToMongo };
