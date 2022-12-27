const { usersDao } = require("../../Persistence/DAOs/DAOselector");

async function getCartProducts(user) {
  try {
    let userInfo = await usersDao.getUserInfo(user);
    return userInfo.userCart;
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }
}

async function addProductToUserCart(user, product) {
  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod._id == product.id);
  if (productIndex == -1) {
    cart.push(product);
    // product = { productId, quantity }
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

async function removeOneFromCartProduct(productId) {
  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod._id == product.id);
  if (productIndex == -1) {
    throw { error: "Producto no encontrado", errorCode: 400 };
  }

  if (cart[productIndex].quantity > 1) {
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
  cart = cart.filter((product) => product.id != productId);
  // Elimina el producto del carrito

  try {
    const response = await usersDao.updateCart(userInfo.alias, cart);
    return response;
  } catch (err) {
    throw { error: "Error al actualizar el carrito", errorCode: 500 };
  }
}

async function buyCart(user) {
  try {
    let userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 500 };
  }
}

module.exports = {
  getCartProducts,
  addProductToUserCart,
  removeOneFromCartProduct,
  deleteProductFromUserCart,
  buyCart,
};
