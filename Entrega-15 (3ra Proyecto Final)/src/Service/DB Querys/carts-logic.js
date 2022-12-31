const { usersDao } = require("../../Persistence/DAOs/DAOselector");
const { sendNewOrderEmailToAdmin } = require("../utils/nodemailerMessages");
const {
  sendNewOrderMessageToAdmin,
  sendOrderConfirmationMessageToUser,
} = require("../utils/twilioMessages");
const { getProductById } = require("./products");

async function getCartProducts(user) {
  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  if (userInfo.userCart == []) {
    const emptyCart = {
      thumbnail: "",
      title: "No hay productos en el carrito",
      quantity: "",
      price: "",
      unitaryPrice: "",
    };

    return { userCartProducts: emptyCart, total: 0, name: user };
  } else {
    const cartProducts = userInfo.userCart;
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
          _id: foundProduct._id,
        };

        userCartProducts.push(cartProductInfo);
        total += cartProductInfo.unitaryPrice;
      } catch (err) {
        throw {
          errorCode: 500,
          error: "Error al buscar un producto del carrito",
        };
      }
    }

    return { userCartProducts, total, name: user };
  }
}

async function addProductToUserCart(user, productId, prodQuantity = 1) {
  if (productId == null) {
    throw { error: "Producto no especificado", errorCode: 400 };
  }

  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod.id == productId);
  if (productIndex == -1) {
    cart.push({ id: productId, quantity: prodQuantity });
  } else {
    cart[productIndex].quantity += 1;
  }

  try {
    const response = await usersDao.updateCart(userInfo.alias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

async function removeOneFromCartProduct(user, productId) {
  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod.id == productId);
  if (productIndex == -1) {
    throw { error: "Producto no encontrado", errorCode: 400 };
  } else {
    cart[productIndex].quantity -= 1;
  }

  try {
    const response = await usersDao.updateCart(userInfo.alias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

async function deleteProductFromUserCart(user, productId) {
  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod.id == productId);
  if (productIndex == -1) {
    throw { error: "Producto no encontrado", errorCode: 400 };
  } else {
    cart.splice(productIndex, 1);
  }

  try {
    const response = await usersDao.updateCart(userInfo.alias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

async function buyCart(user) {
  let userInfo;
  let userCart;

  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  try {
    userCart = await getCartProducts(user);
  } catch (err) {
    throw { error: "No se ", errorCode: 400 };
  }

  try {
    // Twilio Messages
    await sendNewOrderMessageToAdmin(userCart.userCartProducts, userInfo);
    await sendOrderConfirmationMessageToUser(userInfo);

    // Nodemailer Messages
    await sendNewOrderEmailToAdmin(userCart.userCartProducts, userInfo);
  } catch (err) {
    throw { error: err, errorCode: 400 };
  }

  return { status: 200 };
}

module.exports = {
  getCartProducts,
  addProductToUserCart,
  removeOneFromCartProduct,
  deleteProductFromUserCart,
  buyCart,
};
