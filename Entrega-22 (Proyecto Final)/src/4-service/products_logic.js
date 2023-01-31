const { ProductsQueries } = require("./queries_to_db/products_queries");

const products = new ProductsQueries();

class Products {
  static instance;

  constructor() {
    // -!!- of "undefined" = false
    if (!!Products.instance) {
      return Products.instance;
    }
    Products.instance = this;
  }

  async getAll() {
    try {
      return await products.getAll();
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      return await products.getById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async create(data) {
    try {
      return await products.create(data);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      return await products.update(data);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      return await products.deleteById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      return await products.deleteAll();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Products;
