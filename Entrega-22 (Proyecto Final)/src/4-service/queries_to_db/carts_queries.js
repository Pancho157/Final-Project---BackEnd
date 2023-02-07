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
  async getUserCart(email) {
    try {
      const user = await UsersDao.getByEmail(email);

      if (!user) {
        throw { error: "Usuario no encontrado", errorCode: 400 };
      }

      return user.userCart;
    } catch (err) {
      consle.log(err);
    }
  }

  async updateUserCart(email, data) {
    try {
      return await UsersDao.updateCart(email, data);
    } catch (err) {
      consle.log(err);
    }
  }

  async deleteUserCart(email) {
    try {
      return await UsersDao.updateCart(email, { userCart: [] });
    } catch (err) {
      consle.log(err);
    }
  }
}

module.exports = { CartsQueries };