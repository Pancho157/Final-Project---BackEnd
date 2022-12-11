const { ProductsMongoAtlas } = require("./Products/ProductsController");
const { UserControllerMongo } = require("./Users/UsersController");

// Por defecto FS

const configs = JSON.parse(process.env.CONFIGS);
// console.log(configs)
let productsDao = new ProductsMongoAtlas(configs.mariadb);
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
