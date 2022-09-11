const fs = require("fs");
const CartTemplate = require("./carts_template");
const products = require("./products_controller");

const cartsFile = "./data/carts.txt";

const getCarts = async () => {
  try {
    // Obtenemos la información (JSON)
    const data = await fs.promises.readFile(cartsFile, "utf-8", (err, data) => {
      return data;
    });

    return JSON.parse(data); // Devuelve la informacion parseada
  } catch (err) {
    return err;
  }
};

const addCart = async () => {
  let carts;
  try {
    carts = await getCarts();
  } catch (err) {
    return err;
  }

  const newCart = new CartTemplate(cartsFile);
  carts.push(newCart);

  try {
    fs.promises.writeFile(newCart.route, JSON.stringify(carts, null, 2));
    return `Se guardó el carrito con el id: ${newCart.cartId}`;
  } catch (err) {
    return `Error al guardar el carrito: ${err}`;
  }
};

const deleteCartById = async (id) => {
  let carts;
  let filteredCarts;
  // Trae los carritos y los filtra
  try {
    carts = await getCarts();
    filteredCarts = carts.filter((cart) => {
      if (cart.cartId != id) return cart;
    });
  } catch (err) {
    return err;
  }

  if (filteredCarts.length === carts.length) {
    return `No se ha encontrado un carrito con el ID  = ${id}`;
  }

  // Guarda todos los carritos, a excepción de el que posee el id mandado como param
  try {
    fs.promises.writeFile(cartsFile, JSON.stringify(filteredCarts, null, 2));
    return `Se eliminó con el id: ${id}`;
  } catch {
    return `Error al eliminar el carrito: ${Error}`;
  }
};

const getProductsFromCart = async (id) => {
  let carts;
  let cartIndex;
  // Trae los carritos y los filtra
  try {
    carts = await getCarts();
    cartIndex = carts.findIndex((cart) => {
      return cart.cartId == id;
    });
  } catch (err) {
    return err;
  }

  if (cartIndex == -1) return `No se encontró el carrito con el ID = ${id}`;

  return carts[cartIndex].cartProducts;
};

const deleteCartProductById = async (cartId, productId) => {
  let carts;
  let cartIndex;
  // Trae los carritos y los filtra
  try {
    carts = await getCarts();
    cartIndex = carts.findIndex((cart) => {
      return cart.cartId == cartId;
    });
  } catch (err) {
    return err;
  }

  if (cartIndex == -1) return `No se encontró el carrito con el ID = ${cartId}`;

  let allCartProducts = carts[cartIndex].cartProducts;

  let cartProducts = allCartProducts.filter(
    (product) => product.id != productId
  );

  if (carts[cartIndex].cartProducts.length == cartProducts.length) {
    return `No se encontró un producto con el id: ${productId} dentro del carrito con id: ${cartId}`;
  }

  carts[cartIndex].cartProducts = cartProducts;

  try {
    await fs.promises.writeFile(cartsFile, JSON.stringify(carts, null, 2));
    return `Se eliminó el producto con el id: ${productId} al carrito con id: ${cartId}`;
  } catch {
    return `Error al agregar el producto al carrito: ${Error}`;
  }
};

const addCartProductById = async (cartId, productId) => {
  let carts;
  let cartIndex;
  // Trae los carritos y los filtra
  try {
    carts = await getCarts();
    cartIndex = carts.findIndex((cart) => {
      return cart.cartId == cartId;
    });
  } catch (err) {
    return err;
  }

  if (cartIndex == -1)
    return `No se encontró el carrito con el ID = ${productId}`;

  let productToAdd;
  try {
    productToAdd = await products.getById(productId);
  } catch (err) {
    return `${err}`;
  }

  if (!productToAdd) {
    return `Error al encontrar el producto con el id: ${productId}`;
  }

  let cartProducts = carts[cartIndex].cartProducts;
  cartProducts.push(productToAdd);

  try {
    await fs.promises.writeFile(cartsFile, JSON.stringify(carts, null, 2));
    return `Se agregó el producto con el id: ${productId} al carrito con id: ${cartId}`;
  } catch {
    return `Error al agregar el producto al carrito: ${Error}`;
  }
};

module.exports = {
  addCart,
  deleteCartById,
  getProductsFromCart,
  deleteCartProductById,
  addCartProductById,
};
