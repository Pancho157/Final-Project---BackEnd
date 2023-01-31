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
    } catch (error) {
      console.log(err);
    }
  }

  async getById(id) {
    try {
      return await this.model.find({ _id: id });
    } catch (err) {
      console.log(err);
    }
  }

  async add(data) {
    try {
      return await this.model.create({
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        stock: data.stock,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async updateById(id, data) {}

  async deleteById(id) {}

  async deleteAll() {}
}

module.exports = { ProductsMongo };
