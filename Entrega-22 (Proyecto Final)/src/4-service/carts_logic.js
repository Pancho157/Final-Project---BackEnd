const { logger } = require("../../configs/logger");

// queries controllers
const { CartsQueries } = require("./queries_to_db/carts_queries");
const { ProductsQueries } = require("./queries_to_db/products_queries");
const { PurchasesQueries } = require("./queries_to_db/purchases_queries");

// Messages
const { sendNewOrderEmailToAdmin } = require("../../configs/nodemailer");

const carts = new CartsQueries();
const products = new ProductsQueries();
const purchases = new PurchasesQueries();

class Carts {
  constructor() {}

  // ---------------------------------------------------------------
  async getProducts(email) {
    let userCart;
    let detailedCart = [];
    let totalPrice = 0;
    try {
      userCart = await carts.getUserCart(email);
    } catch (err) {
      logger.error(err);
      throw { error: "No se encontró el carrito indicado", errorCode: 404 };
    }

    for (const product of userCart.cart) {
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

    return {
      cart: detailedCart,
      total: totalPrice,
      userEmail: email,
      delivery: userCart.deliveryAddress,
    };
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
    const productIndex = userCart.cart.findIndex(
      (prod) => prod.id == productId
    );

    // Adds product if not found
    if (productIndex == -1) {
      userCart.cart.push({ id: productId, quantity: 1 });
    } else {
      userCart.cart[productIndex].quantity += 1;
    }

    try {
      return await carts.updateUserCart(email, { cart: userCart.cart });
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
    const productIndex = userCart.cart.findIndex(
      (prod) => prod.id == productId
    );
    // Adds product if not found
    if (productIndex == -1) {
      throw { error: "Producto no encontrado", errorCode: 400 };
    } else if (userCart.cart[productIndex].quantity > 1) {
      userCart.cart[productIndex].quantity -= 1;
    }
    try {
      return await carts.updateUserCart(email, { cart: userCart.cart });
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
    const productIndex = userCart.cart.findIndex(
      (prod) => prod.id == productId
    );
    if (productIndex == -1) {
      throw { error: "Producto no encontrado", errorCode: 404 };
    } else {
      userCart.cart.splice(productIndex, 1);
    }
    try {
      return await carts.updateUserCart(email, { cart: userCart.cart });
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
      throw { error: "No se encontró el carrito especificado", errorCode: 400 };
    }

    if (userCart.cart.length == 0) {
      throw { error: "El carrito se encuentra vacío", errorCode: 401 };
    }

    const purchaseInfo = userCart;
    purchaseInfo.date = new Date();

    try {
      await sendNewOrderEmailToAdmin(purchaseInfo);
    } catch (err) {
      throw {
        error: "Error al enviar el email al administrador",
        errorCode: 500,
      };
    }

    purchaseInfo.status = "Generada";
    try {
      await purchases.addPurchase(purchaseInfo);
    } catch (err) {
      logger.error(err);
      throw {
        error: "Error al generar la orden de compra",
        errorCode: 500,
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
    return { message: "Disfrute su compra!" };
  }
}

module.exports = {
  Carts,
};
