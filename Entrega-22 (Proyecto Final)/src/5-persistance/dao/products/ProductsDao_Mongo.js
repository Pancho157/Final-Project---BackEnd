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
  }

  async getAll() {
    try {
      const products = await this.model.find();
      return products;
    } catch (error) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async getByCategory(category) {
    try {
      return await this.model.find({ category });
    } catch (err) {
      console.log(err);
    }
  }

  async add(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      console.log(err);
    }
  }

  async updateById(id, data) {
    try {
      return await Products.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (err) {
      console.log(err);
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
