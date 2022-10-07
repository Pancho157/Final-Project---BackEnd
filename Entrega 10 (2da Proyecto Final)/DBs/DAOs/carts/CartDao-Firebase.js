// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

const { FieldValue } = require("firebase-admin/firestore");
const { db } = require("../../db_initialization/firebase");

class CartsControllerFirebase {
  constructor() {
    this.coleccion = db.collection("Carts");
    this.productsCollection = db.collection("Products");
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
        message: `${err}`,
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
      return `${newId}`;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }
  }

  async deleteCartById(id) {
    try {
      const query = await this.coleccion.doc(id).delete();
      return id;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }
  }

  async getProductsFromCart(id) {
    let cart;
    try {
      cart = await this.coleccion.doc(id).get();
      cart = cart.data().cartProducts;
      // return doc.data().cartProducts;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }

    const cartProducts = cart.map(async (prodId) => {
      try {
        const product = await this.productsCollection.doc(`${prodId}`).get();
        return product;
      } catch (err) {
        return "Producto no encontrado";
      }
    });

    return cartProducts;
  }

  async deleteCartProductById(cartId, productId) {
    // Actualiza el carrito (en caso de encontrar el producto en el array)
    try {
      const response = await this.coleccion.doc(cartId).update({
        cartProducts: FieldValue.arrayRemove(parseInt(productId)),
      });

      return `Se ha eliminado el producto con ID = ${productId} del carrito con ID = ${cartId}`;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }
  }

  async addCartProductById(cartId, productId) {
    // Verifica que exista el producto
    try {
      const productExists = await this.productsCollection
        .doc(`${productId}`)
        .get();

      if (!productExists) {
        return `No existe el producto con ID = ${productId}`;
      }
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }

    // Actualiza el carrito (en caso de encontrar el producto en el array)
    try {
      const response = await this.coleccion.doc(cartId).update({
        cartProducts: FieldValue.arrayUnion(productId),
      });
      return `Se ha agregado el producto con ID = ${productId} del carrito con ID = ${cartId}`;
    } catch (err) {
      return {
        error: true,
        message: `${err}`,
      };
    }
  }
}

module.exports = { CartsControllerFirebase };
