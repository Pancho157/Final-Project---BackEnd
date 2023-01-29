const { ProductsDao } = require("./ProductsDao_template");
const { Products } = require("../../../../configs/mongoose_schemas");

class ProductsMongo extends ProductsDao {
  static instance;
  constructor() {
    super();

    // -!!- of "undefined" = false
    if (!!ProductsMongo.instance) {
      return ProductsMongo.instance;
    }
    ProductsMongo.instance = this;
    this.model = Products;
    this.getLastId();
  }

  async getLastId() {
    try {
      const lastProduct = await this.model.find().sort({ _id: -1 }).limit(1);
      lastProduct[0]._id
        ? (this.lastId = lastProduct[0]._id)
        : (this.lastId = 1);
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      const products = await this.model.find();
      return products;
    } catch (error) {}
  }

  async getById(id) {}

  async add(data) {}

  async updateById(id, data) {}

  async deleteById(id) {}

  async deleteAll() {}
}

module.exports = { ProductsMongo };
