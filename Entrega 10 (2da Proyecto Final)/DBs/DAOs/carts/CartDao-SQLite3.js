// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

import knex from "knex";
import config from "../../configs/configs";

class CartsControllerSQLite3 {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }

  async getCarts() {}

  async addCart() {}

  async deleteCartById(id) {}

  async getProductsFromCart(id) {}

  async deleteCartProductById(cartId, productId) {}

  async addCartProductById(cartId, productId) {}
}

export default CartsControllerSQLite3;
