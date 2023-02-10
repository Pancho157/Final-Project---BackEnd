let ProductsDao;
let UsersDao;
let ChatDao;
let PurchasesDao;
let CartsDao;

switch (process.env.PERS) {
  case "MONGO": {
    // requires
    const {
      connectToMongo,
    } = require("../../../configs/mongo_atlas_connection.js");
    const { ProductsMongo } = require("./products/ProductsDao_Mongo.js");
    const { UsersMongo } = require("./users/UsersDao_Mongo.js");
    const { ChatMongo } = require("./chat/ChatDao_Mongo");
    const { CartsMongo } = require("./carts/CartsDao_Mongo.js");
    const {
      PurchasesMongo,
    } = require("./purchase_orders/PurchasesDao_Mongo.js");

    // instanciation - BBDD connection
    connectToMongo();
    ProductsDao = new ProductsMongo();
    UsersDao = new UsersMongo();
    ChatDao = new ChatMongo();
    CartsDao = new CartsMongo();
    PurchasesDao = new PurchasesMongo();
    break;
  }

  default: {
    throw new Error("Please select a database");
  }
}

module.exports = { ProductsDao, UsersDao, ChatDao, PurchasesDao, CartsDao };
