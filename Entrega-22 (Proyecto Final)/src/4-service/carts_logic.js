const { CartsQueries } = require("./queries_to_db/carts_queries");
const { ProductsQueries } = require("./queries_to_db/products_queries");

// Messages
const { sendNewOrderEmailToAdmin } = require("../../configs/nodemailer");

const carts = new CartsQueries();
const products = new ProductsQueries();

class Carts {
  constructor() {}

  // ---------------------------------------------------------------
  async create(userId, email, delivery) {
    try {
      const cart = await products.createCart({
        email,
        delivery,
      });

      await products.update(userId, { userCart: cart._id });

      return cart;
    } catch (err) {
      console.log(err);
      throw { error: "Error al generar el carrito", errorCode: 500 };
    }
  }

  // ---------------------------------------------------------------
  async getProducts(email) {
    let userCart, detailedCart;
    let totalPrice = 0;
    try {
      userCart = await carts.getUserCart(email);
    } catch (err) {
      console.log(err);
      throw { error: "No se encontró el carrito indicado", errorCode: 404 };
    }

    for (const product of userCart) {
      const productDetails = await products.getById(product.id);

      const quantity =
        product.quantity > productDetails.stock
          ? (product.quantity = product.stock)
          : product.quantity;

      const productData = {
        id: product.id,
        quantity: quantity,
        thumbnail: productDetails.thumbnail,
        title: productDetails.title,
        price: productDetails.price,
        unitaryPrice: productDetails.price * product.quantity,
      };

      detailedCart.push(productData);
      totalPrice += productData.unitaryPrice;
    }

    return { cart: detailedCart, total: totalPrice, userEmail: email };
  }

  // ---------------------------------------------------------------
  // Searchs cart, finds productId index and updates cart with product quantity +1
  async addOne(email, productId) {
    if (productId == null) {
      throw { error: "Producto no especificado", errorCode: 400 };
    }
    let userCart;
    try {
      userCart = await carts.getUserCart(email);
    } catch (err) {
      throw { error: "No se encontró el usuario indicado", errorCode: 404 };
    }
    const productIndex = userCart.findIndex((prod) => prod.id == productId);
    // Adds product if not found
    if (productIndex == -1) {
      userCart.push({ id: productId, quantity: prodQuantity });
    } else {
      userCart[productIndex].quantity += 1;
    }
    try {
      return await carts.updateUserCart(email, userCart);
    } catch (err) {
      throw { error: "Error al actualizar el carrito", errorCode: 500 };
    }
  }

  // ---------------------------------------------------------------
  // Searchs cart, finds productId index and updates cart with product quantity -1
  async removeOne(email, productId) {
    if (productId == null) {
      throw { error: "Producto no especificado", errorCode: 400 };
    }
    let userCart;
    try {
      userCart = await carts.getUserCart(email);
    } catch (err) {
      throw { error: "No se encontró el usuario indicado", errorCode: 404 };
    }
    const productIndex = userCart.findIndex((prod) => prod.id == productId);
    // Adds product if not found
    if (productIndex != -1) {
      userCart.push({ id: productId, quantity: prodQuantity });
    } else if (userCart[productIndex].quantity > 1) {
      userCart[productIndex].quantity -= 1;
    }
    try {
      return await carts.updateUserCart(email, userCart);
    } catch (err) {
      throw { error: "Error al actualizar el carrito", errorCode: 500 };
    }
  }

  // ---------------------------------------------------------------
  async deleteProduct(email, productId) {
    let userCart;
    try {
      userCart = await carts.getUserCart(email);
    } catch (err) {
      throw { error: "No se encontró el usuario indicado", errorCode: 404 };
    }
    const productIndex = userCart.findIndex((prod) => prod.id == productId);
    if (productIndex == -1) {
      throw { error: "Producto no encontrado", errorCode: 404 };
    } else {
      userCart.splice(productIndex, 1);
    }
    try {
      const response = await updateUserCart(email, userCart);
      return response;
    } catch (err) {
      throw { error: "Error al actualizar el carrito", errorCode: 500 };
    }
  }

  // ---------------------------------------------------------------
  async buy(email) {
    let userCart;
    try {
      userCart = await this.getProducts(email);
    } catch (err) {
      throw { error: "No se ", errorCode: 400 };
    }

    try {
      await sendNewOrderEmailToAdmin(userCart);
    } catch (err) {
      throw {
        error: "Error al enviar el email al administrador",
        errorCode: 400,
      };
    }

    try {
      await carts.emptyUserCart(email);
    } catch (err) {
      throw {
        error: "Error al vaciar el carrito",
        errorCode: 400,
      };
    }
    return { message: "Carrito comprado exitosamente" };
  }
}

module.exports = {
  Carts,
};
