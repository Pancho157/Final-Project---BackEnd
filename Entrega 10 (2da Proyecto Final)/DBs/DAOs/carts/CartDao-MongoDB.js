// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

const { Cart } = require("../../utils/mongoSchemasModels");

class CartsControllerMongo {
  constructor() {}

  async getCarts() {}

  async addCart() {
    const cart = await Cart.create({ _id: "1", cartProducts: [] });
  }

  async deleteCartById(id) {}

  async getProductsFromCart(id) {}

  async deleteCartProductById(cartId, productId) {}

  async addCartProductById(cartId, productId) {}
}

module.exports = { CartsControllerMongo };
