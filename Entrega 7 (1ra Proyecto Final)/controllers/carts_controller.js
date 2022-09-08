const fs = require("fs");
const CartTemplate = require("./carts_template");

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
  let carts = [];
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
  } catch {
    return `Error al guardar el carrito: ${Error}`;
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
    await fs.promises.writeFile(
      cartsFile,
      JSON.stringify(filteredCarts, null, 2)
    );
    return `Se eliminó con el id: ${id}}`;
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
      return cart.id == id;
    });
  } catch (err) {
    return err;
  }

  if (cartIndex == -1) return `No se encontró el producto con el ID = ${id}`;

  return carts[cartIndex].getProducts();
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

  return carts[cartIndex].deleteProductById(productId);
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

  return carts[cartIndex].addProductToCart(productId);
};

module.exports = {
  addCart,
  deleteCartById,
  getProductsFromCart,
  deleteCartProductById,
  addCartProductById,
};
