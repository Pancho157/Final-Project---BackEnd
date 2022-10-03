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
      const querySnapshot = await this.coleccion.get();
      const carts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return carts;
    } catch (err) {
      return {
        error: -11,
        errorStatus: 500,
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
      await this.coleccion.add(
        (timestamp = [date, time, newDate]),
        (cartProducts = 12)
      );
    } catch (err) {
      return `{error: -11, errorStatus: 500, message: "Error de generación"}`;
    }
  }

  async deleteCartById(id) {}

  async getProductsFromCart(id) {}

  async deleteCartProductById(cartId, productId) {}

  async addCartProductById(cartId, productId) {}
}

module.exports = { CartsControllerFirebase };
