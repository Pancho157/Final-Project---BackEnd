// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

const { FieldValue, FieldPath } = require("firebase-admin/firestore");
const { db } = require("../../db_initialization/firebase");
const {
  ProductsControllerFirebase: products,
} = require("../products/ProductsDao-Firebase");

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
      return `${newId}`;
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
      return id;
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
    let cart;
    // Trae el carrito
    try {
      cart = await this.coleccion.doc(cartId).get();
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }

    const index = cart.cartProducts.indexOf(productId);
    if (index > -1) {
      // Cuando no encuentra nada devuelve -1
      array.splice(index, 1);

      try {
        const response = await this.coleccion.doc(cartId).set(cart);
        return `Se ha eliminado el producto con ID = ${productId} del carrito con ID = ${cartId}`;
      } catch (err) {
        return {
          error: true,
          message: `UPS: ha ocurrido un error: ${err}`,
        };
      }
    }

    return `No se ha encontrado el producto con ID = ${productId} dentro carrito especificado (${cartId})`;
  }

  async addCartProductById(cartId, productId) {
    let cart;
    let product;
    // Trae el carrito
    try {
      cart = await this.coleccion.doc(cartId).get();
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }

    // Verifica que exista el producto
    try {
      const productExists = await products.getById(productId);
      if (!productExists) {
        return `No existe el producto con ID = ${productId}`;
      }
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }

    // Agrega el indice del producto al array
    const index = cart.cartProducts.indexOf(productId);
    if (index > -1) {
      array.splice(index, 1);

      // Actualiza el carrito (en caso de encontrar el producto en el array)
      try {
        const response = await this.coleccion.doc(cartId).set(cart);
        return `Se ha agregado el producto con ID = ${productId} del carrito con ID = ${cartId}`;
      } catch (err) {
        return {
          error: true,
          message: `UPS: ha ocurrido un error: ${err}`,
        };
      }
    }
  }
}

module.exports = { CartsControllerFirebase };
