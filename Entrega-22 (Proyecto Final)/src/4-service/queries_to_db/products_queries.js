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
      console.log(err);
    }
  }

  async getById(id) {
    try {
      return await ProductsDao.getById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async getByCategory(category) {
    try {
      return await ProductsDao.getByCategory(category);
    } catch (err) {
      console.log(err);
    }
  }

  async create(data) {
    try {
      return await ProductsDao.add(data);
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, data) {
    try {
      return await ProductsDao.updateById(id, data);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(id) {
    try {
      return await ProductsDao.deleteById(id);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      return await ProductsDao.deleteAll();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ProductsQueries };
