const { logger } = require("../../loggers-testing/loggers/log4js-config");
const {
  addProductToUserCart,
  deleteProductFromUserCart,
  buyCart,
  getCartProducts,
} = require("../Service/DB Querys/carts");
const { getProductById } = require("../Service/DB Querys/products");

async function getUserCartProducts(req, res) {
  const user = req.session.userName;
  let cartProducts;

  try {
    cartProducts = await getCartProducts(user);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }

  if (cartProducts == []) {
    userCartProducts.push({
      thumbnail: "",
      title: "No hay productos en el carrito",
      quantity: "",
      price: "",
      unitaryPrice: "",
    });
  } else {
    let userCartProducts = [];
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
    res.render("userCart", { userCartProducts, total });
  }
}

async function addOneToCartProduct(req, res) {
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

async function removeOneFromCartProduct(req, res) {
  
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

module.exports = {
  getUserCartProducts,
  addOneToCartProduct,
  removeOneFromCartProduct,
  deleteProductFromCart,
  buyUserCart,
};
