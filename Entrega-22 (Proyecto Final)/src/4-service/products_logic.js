const { logger } = require("../../configs/logger");
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
      logger.error(err);
    }
  }

  async getById(id) {
    try {
      return await products.getById(id);
    } catch (err) {
      logger.error(err);
    }
  }

  async getByCategory(category) {
    try {
      return await products.getByCategory(category);
    } catch (err) {
      logger.error(err);
    }
  }

  async create(data) {
    try {
      return await products.create(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async update(id, data) {
    try {
      return await products.update(id, data);
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteById(id) {
    try {
      return await products.deleteById(id);
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteAll() {
    try {
      return await products.deleteAll();
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = Products;
