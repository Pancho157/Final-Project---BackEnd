// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

const { db } = require("../../db_initialization/firebase");

class CartsControllerFirebase {
  constructor() {
    this.coleccion = db.collection("Carts");
  }

  async getCarts() {
    try {
      const query = await this.coleccion.get();
      const carts = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return carts;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error al traer los datos: ${err}`,
      };
    }
  }

  async addCart() {
    const newDate = new Date();
    const date =
      newDate.getDay() + "/" + newDate.getMonth() + "/" + newDate.getFullYear();

    const time = newDate.getHours() + ":" + newDate.getMinutes();

    try {
      const response = await this.coleccion.add(
        (timestamp = [date, time, newDate]),
        (cartProducts = 12)
      );
      return response.id;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }
  }

  async deleteCartById(id) {
    try {
      const query = await this.coleccion.doc(id).delete();
      return query;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }
  }

  async getProductsFromCart(id) {
    try {
      const doc = await this.coleccion.doc(id).get();
      return doc.data.cartProducts;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }
  }

  async deleteCartProductById(cartId, productId) {}

  async addCartProductById(cartId, productId) {}
}

module.exports = { CartsControllerFirebase };
