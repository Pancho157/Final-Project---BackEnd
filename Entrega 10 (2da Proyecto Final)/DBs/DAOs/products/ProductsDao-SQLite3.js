// Funciones de los productso:
//      save(newObject) {}
//      getById(id) {}
//      getAll() {}
//      deleteById(id) {}
//      update(id, newInfo) {}

class ProductsControllerSQLite3 {
  constructor() {
    // this.coleccion = db.collection("Carts");
  }

  async save(newObject) {}

  async getById(id) {
    const data = await this.coleccion.doc(`${id}`).get();
    console.log(data);
    return data;
  }

  async getAll() {}

  async deleteById(id) {}

  async update(id, newInfo) {}
}

module.exports = { ProductsControllerSQLite3 };
