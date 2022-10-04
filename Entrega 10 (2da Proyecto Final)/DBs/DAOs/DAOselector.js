// Por default se encuentra SQLite3

let productosDao;
let carritosDao;

switch (process.env.PERS) {
  case "firebase":
    const {
      ProductsControllerFirebase,
    } = require("./products/ProductsDao-Firebase");
    const { CartsControllerFirebase } = require("./carts/CartDao-Firebase");

    productosDao = new ProductsControllerFirebase();
    carritosDao = new CartsControllerFirebase();
    break;
  case "mongodb":
    const {
      default: ProductsControllerMongo,
    } = require("./products/ProductsDao-MongoDB");
    const {
      default: CartsControllerMongo,
    } = require("./carts/CartDao-MongoDB");

    productosDao = new ProductsControllerMongo();
    carritosDao = new CartsControllerMongo();
    break;
  case "mariadb":
    const {
      default: ProductsControllerMariadb,
    } = require("./products/ProductsDao-MariaDB");
    const {
      default: CartsControllerMariadb,
    } = require("./carts/CartDao-MariaDB");

    productosDao = new ProductsControllerMariadb();
    carritosDao = new CartsControllerMariadb();
    break;
  default:
    const {
      default: ProductsControllerSQLite3,
    } = require("./products/ProductsDao-SQLite3");
    const {
      default: CartsControllerSQLite3,
    } = require("./carts/CartDao-SQLite3");

    productosDao = new ProductsControllerSQLite3();
    carritosDao = new CartsControllerSQLite3();
    break;
}

module.exports = { productosDao, carritosDao };
