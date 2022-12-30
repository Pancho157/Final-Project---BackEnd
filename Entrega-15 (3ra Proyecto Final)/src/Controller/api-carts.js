const { logger } = require("../../loggers-testing/loggers/log4js-config");
const {
  addProductToUserCart,
  removeOneFromCartProduct,
  deleteProductFromUserCart,
  buyCart,
  getCartProducts,
} = require("../Service/DB Querys/carts-logic");

async function getUserCartProducts(req, res) {
  try {
    const userAndCart = await getCartProducts(req.session.userName);
    res.render("userCart", userAndCart);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function addOneToCartProduct(req, res) {
  const { productId, prodQuantity } = req.body;
  const user = req.session.userName;

  console.log(productId);

  try {
    let userCart = await addProductToUserCart(user, productId, prodQuantity);
    if (userCart) res.redirect("/userCart");
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function removeOneOfProduct(req, res) {
  const { productId } = req.body;
  const user = req.session.userName;

  try {
    let userCart = await removeOneFromCartProduct(user, productId);
    if (userCart) res.redirect("/userCart");
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function deleteProductFromCart(req, res) {
  const { productId } = req.body;
  const user = req.session.userName;

  try {
    let userCart = await deleteProductFromUserCart(user, productId);
    res.redirect("/userCart");
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function buyUserCart(req, res) {
  const user = req.session.userName;

  try {
    const response = await buyCart(user);
    res.status(response.status).send();
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

module.exports = {
  getUserCartProducts,
  addOneToCartProduct,
  removeOneOfProduct,
  deleteProductFromCart,
  buyUserCart,
};
