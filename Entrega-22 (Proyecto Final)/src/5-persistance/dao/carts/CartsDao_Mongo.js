const { CartsMethodsTemplate } = require("./CartsDao_template");
const { Carts } = require("../../../../configs/mongoose_schemas");

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

  async newCart() {
    try {
      return await this.model.create(data);
    } catch (err) {
      console.log(err);
    }
  }

  async getCart(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async updateCart(id, data) {
    try {
      return await this.model.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async emptyCart(id) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: id },
        { items: [] },
        { new: true }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { CartsMongo };
