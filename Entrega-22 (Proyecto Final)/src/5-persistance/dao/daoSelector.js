let ProductsDao;
let UsersDao;
let ChatDao;

switch (process.env.PERS) {
  case "MONGO": {
    // requires
    const {
      connectToMongo,
    } = require("../../../configs/mongo_atlas_connection.js");
    const { ProductsMongo } = require("./products/ProductsDao_Mongo.js");
    const { UsersMongo } = require("./users/UsersDao_Mongo.js");
    const { ChatMongo } = require("./chat/ChatDao_Mongo");

    // instanciation - BBDD connection
    connectToMongo();
    ProductsDao = new ProductsMongo();
    UsersDao = new UsersMongo();
    ChatDao = new ChatMongo();
    break;
  }

  default: {
    throw new Error("Please select a database");
  }
}

module.exports = { ProductsDao, UsersDao, ChatDao };