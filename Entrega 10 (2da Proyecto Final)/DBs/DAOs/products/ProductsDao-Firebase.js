// Funciones de los productso:
//    save(newObject) {}
//    getById(id) {}
//    getAll() {}
//    deleteById(id) {}
//    update(id, newInfo) {}

import admin from "firebase-admin";
import config from "../../configs/configs";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

class ProductsControllerFirebase {
  constructor() {
    this.coleccion = db.collection("Carts");
  }

  async save(newObject) {}

  async getById(id) {}

  async getAll() {}

  async deleteById(id) {}

  async update(id, newInfo) {}
}

export default ProductsControllerFirebase;
