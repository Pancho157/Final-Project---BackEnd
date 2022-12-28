const { usersDao } = require("../../Persistence/DAOs/DAOselector");

async function getCartProducts(user) {
  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  if (userInfo.userCart.length == 0) {
    return {
      thumbnail: "",
      title: "No hay productos en el carrito",
      quantity: "",
      price: "",
      unitaryPrice: "",
    };
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
  let userInfo;
  try {
    userInfo = await usersDao.getUserInfo(user);
  } catch (err) {
    throw { error: "No se encontró el usuario indicado", errorCode: 400 };
  }

  let cart = userInfo.userCart;

  const productIndex = cart.findIndex((prod) => prod._id == productId);
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

  const productIndex = cart.findIndex((prod) => prod._id == productId);
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

  const productIndex = cart.findIndex((prod) => prod._id == productId);
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

async function buyCart(user) {}

module.exports = {
  getCartProducts,
  addProductToUserCart,
  removeOneFromCartProduct,
  deleteProductFromUserCart,
  buyCart,
};
