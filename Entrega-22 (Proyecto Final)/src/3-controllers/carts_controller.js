const { logger } = require("../../configs/logger");
const { Carts } = require("../4-service/carts_logic");

const carts = new Carts();

async function getUserCart(req, res) {
  try {
    res.send(await carts.getProducts(req.user.email));
  } catch (err) {
    logger.error(err);
    res.render("error", { error: err.error, errorCode: err.errorCode });
  }
}

async function addOneToCartProduct(req, res) {
  try {
    res.send(await carts.addOne(req.user.email, req.body.productId));
  } catch (err) {
    logger.error(err);
    res.render("error", { error: err.error, errorCode: err.errorCode });
  }
}

async function removeOneFromCartProduct(req, res) {
  try {
    res.send(await carts.removeOne(req.user.email, req.body.productId));
  } catch (err) {
    logger.error(err);
    res.render("error", { error: err.error, errorCode: err.errorCode });
  }
}

async function deleteCartProduct(req, res) {
  try {
    res.send(await carts.deleteProduct(req.user.email, req.params.id));
  } catch (err) {
    logger.error(err);
    res.render("error", { error: err.error, errorCode: err.errorCode });
  }
}

async function buyCart(req, res) {
  try {
    res.send(await carts.buy(req.user.email));
  } catch (err) {
    logger.error(err);
    res.render("error", { error: err.error, errorCode: err.errorCode });
  }
}

module.exports = {
  getUserCart,
  addOneToCartProduct,
  removeOneFromCartProduct,
  deleteCartProduct,
  buyCart,
};
