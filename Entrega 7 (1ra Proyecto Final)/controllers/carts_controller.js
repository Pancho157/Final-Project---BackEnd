const fs = require("fs");
const CartTemplate = require("./carts_template");

const cartsFile = "./data/carts.txt";

const getCarts = async () => {
  try {
    // Obtenemos la información (JSON)
    const data = await fs.readFile(cartsFile, "utf-8", (err, data) => {
      return data;
    });

    return JSON.parse(data); // Devuelve la informacion parseada
  } catch (error) {
    console.error(`El error es: ${error}`);
  }
};

const addCart = async () => {
  let carts;
  try {
    carts = await getCarts();
  } catch (err) {
    return err;
  }

  const newCart = new CartTemplate(route);
  carts.push(newCart);

  try {
    await fs.writeFile(newCart.route, JSON.stringify(carts, null, 2));
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
      if (cart.id != id) return cart;
    });
  } catch (err) {
    return err;
  }

  // Guarda todos los carritos, a excepción de el que posee el id mandado como param
  try {
    await fs.writeFile(newCart.route, JSON.stringify(filteredCarts, null, 2));
    return `Se guardó el carrito con el id: ${newCart.cartId}`;
  } catch {
    return `Error al guardar el carrito: ${Error}`;
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

const deleteCartProductById = async (id) => {
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

  return carts[cartIndex].deleteProductById(id);
};

const addCartProductById = async (id) => {
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

  return carts[cartIndex].addProductToCart(id);
};

module.exports = {
  addCart,
  deleteCartById,
  getProductsFromCart,
  deleteCartProductById,
  addCartProductById,
};
