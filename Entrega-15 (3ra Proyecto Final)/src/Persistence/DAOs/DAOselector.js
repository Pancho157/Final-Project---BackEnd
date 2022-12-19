const { ProductsMongoAtlas } = require("./Products/ProductsController");
const { UserControllerMongo } = require("./Users/UsersController");

let productsDao = new ProductsMongoAtlas();
let usersDao = new UserControllerMongo();
let chatDao;

switch (process.env.PERS) {
  // ------------- Firebase -------------
  case "firebase":
    const {
      ChatControllerFirebase,
    } = require("./Chat/ChatController_firebase");
    chatDao = new ChatControllerFirebase();
    break;

  // ------------- Mongoose -------------
  default:
    const { ChatControllerMongo } = require("./Chat/ChatController_mongoose");
    chatDao = new ChatControllerMongo();
    break;
}

module.exports = { productsDao, chatDao, usersDao };
