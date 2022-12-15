const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { productsDao, usersDao } = require("../../Persistence/DAOs/DAOselector");

async function addProductToUserCart(user, product) {}
async function deleteProductFromUserCart(user, productId) {}

module.exports = { addProductToUserCart, deleteProductFromUserCart };
