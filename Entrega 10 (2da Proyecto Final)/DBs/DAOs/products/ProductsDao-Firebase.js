// Funciones de los productso:
//    save(newObject) {}
//    getById(id) {}
//    getAll() {}
//    deleteById(id) {}
//    update(id, newInfo) {}

const { db } = require("../../db_initialization/firebase");

class ProductsControllerFirebase {
  constructor() {
    this.coleccion = db.collection("Products");
  }

  async save(newObject) {
    const { title, price, thumbnail, stock } = newObject;
    let allProducts;
    let newId;

    // Consigue el ultimo id y genera el nuevo (como int)
    try {
      allProducts = await this.coleccion.get();
      newId = allProducts.size + 1;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error: ${err}`,
      };
    }

    // Información del nuevo carrito
    var docData = {
      code: md5(newId),
      timestamp: FieldValue.serverTimestamp(),
      title: title,
      price: price,
      thumbnail: thumbnail,
      stock: stock,
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

  async getById(id) {
    try {
      const data = await this.coleccion.doc(`${id}`).get();
      return data.data();
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error al traer los datos: ${err}`,
      };
    }
  }

  async getAll() {
    try {
      const query = await this.coleccion.get();
      const products = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return products;
    } catch (err) {
      return {
        error: true,
        message: `UPS: ha ocurrido un error al traer los datos: ${err}`,
      };
    }
  }

  async deleteById(id) {
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

  async update(id, newInfo) {}
}

module.exports = { ProductsControllerFirebase };
