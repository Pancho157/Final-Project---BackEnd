const { logger } = require("../../../configs/logger");
const { ProductsDao } = require("../../5-persistance/dao/daoSelector");

class ProductsQueries {
  static instance;
  constructor() {
    // -!!- of "undefined" == false
    if (!!ProductsQueries.instance) {
      return ProductsQueries.instance;
    }
    ProductsQueries.instance = this;
  }
  async getAll() {
    try {
      return await ProductsDao.getAll();
    } catch (err) {
      logger.error(err);
    }
  }

  async getById(id) {
    try {
      return await ProductsDao.getById(id);
    } catch (err) {
      logger.error(err);
    }
  }

  async getByCategory(category) {
    try {
      return await ProductsDao.getByCategory(category);
    } catch (err) {
      logger.error(err);
    }
  }

  async create(data) {
    try {
      return await ProductsDao.add(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async update(id, data) {
    try {
      return await ProductsDao.updateById(id, data);
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteById(id) {
    try {
      return await ProductsDao.deleteById(id);
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteAll() {
    try {
      return await ProductsDao.deleteAll();
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { ProductsQueries };
