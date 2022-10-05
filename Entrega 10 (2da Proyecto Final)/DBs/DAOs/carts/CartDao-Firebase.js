// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

const { FieldValue, FieldPath } = require("firebase-admin/firestore");
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
    let allCarts;
    let newId;

    // Consigue el ultimo id y genera el nuevo (como int)
    try {
      allCarts = await this.coleccion.get();
      newId = allCarts.size + 1;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }

    // Información del nuevo carrito
    var docData = {
      timestamp: FieldValue.serverTimestamp(),
      cartProducts: [],
    };

    // Agrega el carrito a la colección
    try {
      const response = await this.coleccion.doc(`${newId}`).set(docData);
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
      return doc.data().cartProducts;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }
  }

  async deleteCartProductById(cartId, productId) {
    // Trae el carrito
    try {
      const query = await this.coleccion.doc(cartId).get();
      return query.data();
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }
  }

  async addCartProductById(cartId, productId) {}
}

module.exports = { CartsControllerFirebase };
