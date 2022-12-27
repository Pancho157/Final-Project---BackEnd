const { logger } = require("../../loggers-testing/loggers/log4js-config");
const {
  addProductToUserCart,
  removeOneFromCartProduct,
  deleteProductFromUserCart,
  buyCart,
  getCartProducts,
} = require("../Service/DB Querys/carts");
const { getProductById } = require("../Service/DB Querys/products");

async function getUserCartProducts(req, res) {
  const user = req.session.userName;
  let userCartProducts = [];
  let cartProducts;

  try {
    cartProducts = await getCartProducts(user);
  } catch (err) {
    logger.error(err);
    return res.status(err.errorCode).send(err.error);
  }

  if (cartProducts.length == 0) {
    userCartProducts.push({
      thumbnail: "",
      title: "No hay productos en el carrito",
      quantity: "",
      price: "",
      unitaryPrice: "",
    });
  } else {
    let total = 0;

    // for of = secuencial  -  forEach = paralelo (deja los await como promesas)
    for (const product of cartProducts) {
      try {
        const foundProduct = await getProductById(product.id);

        const cartProductInfo = {
          thumbnail: foundProduct.thumbnail,
          title: foundProduct.title,
          quantity: product.quantity,
          price: foundProduct.price,
          unitaryPrice: foundProduct.price * product.quantity,
        };

        userCartProducts.push(cartProductInfo);
        total += cartProductInfo.unitaryPrice;
      } catch (err) {
        logger.error(err);
        res.status(err.errorCode).send(err.error);
      }
    }
    res.render("userCart", { userCartProducts, total, name: user });
  }
}

async function addOneToCartProduct(req, res) {
  const { productId, prodQuantity } = req.body;

  const user = req.session.userName;
  const product = {
    id: productId,
    quantity: prodQuantity,
  };

  try {
    const response = await addProductToUserCart(user, product);
    res.json(response);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function removeOneOfProduct(req, res) {
  const { productId } = req.body;

  try {
    const response = await removeOneFromCartProduct(productId);
    res.json(response);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function deleteProductFromCart(req, res) {
  const { productId } = req.body;
  const user = req.session.userName;

  try {
    const response = await deleteProductFromUserCart(user, productId);
    res.json(response);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
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

module.exports = {
  getUserCartProducts,
  addOneToCartProduct,
  removeOneOfProduct,
  deleteProductFromCart,
  buyUserCart,
};
