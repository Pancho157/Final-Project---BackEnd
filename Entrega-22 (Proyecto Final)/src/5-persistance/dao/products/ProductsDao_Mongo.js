const { ProductsMethodsTemplate } = require("./ProductsDao_template");
const { Products } = require("../../../../configs/mongoose_schemas");
const { logger } = require("../../../../configs/logger");

class ProductsMongo extends ProductsMethodsTemplate {
  static instance;
  constructor() {
    super();

    // -!!- of "undefined" = false
    if (!!ProductsMongo.instance) {
      return ProductsMongo.instance;
    }
    ProductsMongo.instance = this;
    this.model = Products;
  }

  async getAll() {
    try {
      const products = await this.model.find();
      return products;
    } catch (err) {
      logger.error(err);
    }
  }

  async getById(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (err) {
      logger.error(err);
    }
  }

  async getByCategory(category) {
    try {
      return await this.model.find({ category });
    } catch (err) {
      logger.error(err);
    }
  }

  async add(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async updateById(id, data) {
    try {
      return await Products.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (err) {
      logger.error(err);
    }
  }

  async deleteById(id) {
    return await Products.deleteOne({ _id: id });
  }

  async deleteAll() {
    return await Products.deleteMany({});
  }
}

module.exports = { ProductsMongo };
