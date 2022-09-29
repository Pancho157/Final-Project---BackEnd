import admin from "firebase-admin";
import config from "../../configs/configs";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

class CartsControllerFirebase {
  constructor() {
    this.coleccion = db.collection("Carts");
  }

  async getCarts() {}

  async addCart() {}

  async deleteCartById(id) {}

  async getProductsFromCart(id) {}

  async deleteCartProductById(cartId, productId) {}

  async addCartProductById(cartId, productId) {}
}

export default CartsControllerFirebase;
