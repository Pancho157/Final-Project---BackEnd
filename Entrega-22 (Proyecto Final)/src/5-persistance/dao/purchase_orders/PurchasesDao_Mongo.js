const { PurchaseMethodsTemplate } = require("./PurchasesDao_template");
const { Purchases } = require("../../../../configs/mongoose_schemas");
const { logger } = require("../../../../configs/logger");

class PurchasesMongo extends PurchaseMethodsTemplate {
  static instance;
  constructor() {
    super();

    // -!!- of "undefined" = false
    if (!!PurchasesMongo.instance) {
      return PurchasesMongo.instance;
    }
    PurchasesMongo.instance = this;
    this.model = Purchases;
  }

  async addPurchase(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async changeStatus(id, status) {
    return await this.model.findOneAndUpdate(
      { id: id },
      { status: status },
      { new: true }
    );
  }
}

module.exports = { PurchasesMongo };
