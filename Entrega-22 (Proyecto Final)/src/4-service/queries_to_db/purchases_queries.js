const { logger } = require("../../../configs/logger");
const { PurchaseDao } = require("../../5-persistance/dao/daoSelector");

class CartsQueries {
  static instance;
  constructor() {
    // -!!- of "undefined" == false
    if (!!ProductsQueries.instance) {
      return ProductsQueries.instance;
    }
    ProductsQueries.instance = this;
  }

  async addPurchase(data) {
    try {
      return await PurchaseDao.addPurchase(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async changeStatus(purchaseId, status) {
    try {
      return await PurchaseDao.changeStatus(purchaseId, status);
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { CartsQueries };
