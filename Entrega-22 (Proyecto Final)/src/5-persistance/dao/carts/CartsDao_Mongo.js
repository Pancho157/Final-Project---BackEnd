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

  newCart() {}

  getCart(id) {}

  updateCart(id, data) {}

  emptyCart(id) {}
}

module.exports = { CartsMongo };
