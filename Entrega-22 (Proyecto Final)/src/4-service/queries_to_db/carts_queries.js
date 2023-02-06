const {
  UsersDao,
  ProductsDao,
} = require("../../5-persistance/dao/daoSelector");

class CartsQueries {
  static instance;
  constructor() {
    // -!!- of "undefined" == false
    if (!!ProductsQueries.instance) {
      return ProductsQueries.instance;
    }
    ProductsQueries.instance = this;
  }
  async getUserCart(user) {}

  async updateUserCart(user, data) {}

  async deleteUserCart(user) {}
}

module.exports = { CartsQueries };
