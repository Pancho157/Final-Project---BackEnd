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

  async addPurchase(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      console.log(err);
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
