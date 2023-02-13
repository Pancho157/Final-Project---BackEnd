const mongoose = require("mongoose");
const { logger } = require("./logger");

function connectToMongo() {
  let connectionURL =
    process.env.ENV == "prod"
      ? process.env.MONGO_ATLAS_URL
      : process.env.MONGO_LOCAL_URL;

  mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  logger.info("Connected to MongoDB successfully");
}

mongoose.set("strictQuery", false);

module.exports = { connectToMongo };
