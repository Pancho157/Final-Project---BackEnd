const { logger } = require("../../../configs/logger");
const { PurchasesDao } = require("../../5-persistance/dao/daoSelector");

class PurchasesQueries {
  static instance;
  constructor() {
    // -!!- of "undefined" == false
    if (!!PurchasesQueries.instance) {
      return PurchasesQueries.instance;
    }
    PurchasesQueries.instance = this;
  }

  async addPurchase(data) {
    try {
      return await PurchasesDao.addPurchase(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async changeStatus(purchaseId, status) {
    try {
      return await PurchasesDao.changeStatus(purchaseId, status);
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { PurchasesQueries };
