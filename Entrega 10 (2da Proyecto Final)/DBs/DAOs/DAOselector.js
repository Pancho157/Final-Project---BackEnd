// Por default se encuentra SQLite3

let productsDao;
let cartsDao;

switch (process.env.PERS) {
  case "firebase":
    const {
      ProductsControllerFirebase,
    } = require("./products/ProductsDao-Firebase");
    const { CartsControllerFirebase } = require("./carts/CartDao-Firebase");

    productsDao = new ProductsControllerFirebase();
    cartsDao = new CartsControllerFirebase();
    break;
  case "mongodb":
    const {
      default: ProductsControllerMongo,
    } = require("./products/ProductsDao-MongoDB");
    const {
      default: CartsControllerMongo,
    } = require("./carts/CartDao-MongoDB");

    productsDao = new ProductsControllerMongo();
    cartsDao = new CartsControllerMongo();
    break;
  case "mariadb":
    const {
      default: ProductsControllerMariadb,
    } = require("./products/ProductsDao-MariaDB");
    const {
      default: CartsControllerMariadb,
    } = require("./carts/CartDao-MariaDB");

    productsDao = new ProductsControllerMariadb();
    cartsDao = new CartsControllerMariadb();
    break;
  default:
    const {
      default: ProductsControllerSQLite3,
    } = require("./products/ProductsDao-SQLite3");
    const {
      default: CartsControllerSQLite3,
    } = require("./carts/CartDao-SQLite3");

    productsDao = new ProductsControllerSQLite3();
    cartsDao = new CartsControllerSQLite3();
    break;
}

module.exports = { productsDao, cartsDao };
