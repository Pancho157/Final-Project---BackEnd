// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

const config = require("../../configs/configs");
const admin = require("firebase-admin");

class CartsControllerFirebase {
  constructor() {
    // this.coleccion = db.collection("Carts");
  }

  async getCarts() {}

  async addCart() {}

  async deleteCartById(id) {}

  async getProductsFromCart(id) {}

  async deleteCartProductById(cartId, productId) {}

  async addCartProductById(cartId, productId) {}
}

module.exports = { CartsControllerFirebase };
