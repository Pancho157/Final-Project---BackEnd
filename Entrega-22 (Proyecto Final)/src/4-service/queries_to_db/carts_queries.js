const { logger } = require("../../../configs/logger");
const { CartsDao } = require("../../5-persistance/dao/daoSelector");

class CartsQueries {
  static instance;
  constructor() {
    // -!!- of "undefined" == false
    if (!!ProductsQueries.instance) {
      return ProductsQueries.instance;
    }
    ProductsQueries.instance = this;
  }

  async createCart(email, delivery) {
    try {
      return await CartsDao.newCart({
        user: email,
        cart: [],
        deliveryAddress: delivery,
      });
    } catch (err) {
      logger.error(err);
    }
  }

  async getUserCart(email) {
    try {
      const cart = await CartsDao.getCart(email);

      if (!cart) {
        throw { error: "Usuario no encontrado", errorCode: 400 };
      }

      return cart.cart;
    } catch (err) {
      logger.error(err);
    }
  }

  async updateUserCart(email, data) {
    try {
      return await CartsDao.updateCart(email, data);
    } catch (err) {
      logger.error(err);
    }
  }

  async emptyUserCart(email) {
    try {
      return await CartsDao.updateCart(email, { cart: [] });
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { CartsQueries };
