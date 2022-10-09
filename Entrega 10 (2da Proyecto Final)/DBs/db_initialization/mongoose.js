const mongoose = require("mongoose");

const connection = mongoose.createConnection(
  "mongodb://mongo:27017/dbName?authSource=admin",
  {
    useNewUrlParser: true,
    user: process.env.MONGOUSER,
    pass: process.env.MONGOPASS,
    keepAlive: true,
  }
);
connection.on("connected", () => {
  console.log("MONGOOSE: connected");
});

connection.on("close", () => {
  console.log("MONGOOSE: connection close");
});

connection.on("error", (error) => {
  console.log("MONGOOSE: connection error", error);
});

module.exports = { connection };

/* 
const connection = mongoose.connect(
  `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASS}@localhost/ecommerce`,
  () => {
    console.log("Mongo connected");
  }
);

module.exports = { connection };
*/
