const { CartsMethodsTemplate } = require("./CartsDao_template");
const { Carts } = require("../../../../configs/mongoose_schemas");
const { logger } = require("../../../../configs/logger");

class CartsMongo extends CartsMethodsTemplate {
  static instance;
  constructor() {
    super();

    // -!!- of "undefined" = false
    if (!!CartsMongo.instance) {
      return CartsMongo.instance;
    }
    CartsMongo.instance = this;
    this.model = Carts;
  }

  async newCart(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async getCart(email) {
    try {
      return await this.model.findOne({ user: email });
    } catch (err) {
      logger.error(err);
    }
  }

  async updateCart(email, data) {
    try {
      return await this.model.findOneAndUpdate({ user: email }, data, {
        new: true,
      });
    } catch (err) {
      logger.error(err);
    }
  }

  async emptyCart(id) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: id },
        { cart: [] },
        { new: true }
      );
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { CartsMongo };
