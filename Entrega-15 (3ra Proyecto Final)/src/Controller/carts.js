const { logger } = require("../../loggers-testing/loggers/log4js-config");
const {
  addProductToUserCart,
  deleteProductFromUserCart,
  buyCart,
} = require("../Service/DB Querys/carts");

async function addProductToCart(req, res) {
  const { productId, prodQuantity } = req.body;
  let response;

  const user = req.session.userName;
  const product = {
    id: productId,
    quantity: prodQuantity,
  };

  try {
    response = await addProductToUserCart(user, product);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }

  if (response) {
    res.status(200);
  }
}

async function deleteProductFromCart(req, res) {
  const { productId } = req.body;
  const user = req.session.userName;

  let response;

  try {
    response = await deleteProductFromUserCart(user, productId);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }

  if (response) {
    res.status(200);
  }
}

async function buyUserCart(req, res) {
  const user = req.session.userName;
  let response;
  try {
    response = await buyCart(user);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }

  if (response) {
    res.render("cartOrderSuccess", { id: response.id, phone: response.phone });
  }
}

module.exports = { addProductToCart, deleteProductFromCart, buyUserCart };
