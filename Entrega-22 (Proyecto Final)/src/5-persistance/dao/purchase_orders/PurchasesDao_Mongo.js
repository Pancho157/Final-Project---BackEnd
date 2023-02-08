const { PurchaseMethodsTemplate } = require("./PurchasesDao_template");
const { Purchases } = require("../../../../configs/mongoose_schemas");

class PurchasesMongo extends PurchaseMethodsTemplate {
  static instance;
  constructor() {
    super();

    // -!!- of "undefined" = false
    if (!!CartsMongo.instance) {
      return CartsMongo.instance;
    }
    CartsMongo.instance = this;
    this.model = Purchases;
  }

  addPurchase() {}

  changeStatus(id) {}
}

module.exports = { PurchasesMongo };
