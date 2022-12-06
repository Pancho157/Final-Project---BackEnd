const { Products } = require("../../utils/Mongoose-Schemas_Models");
const { logger } = require("../../../loggers/log4js-config");

class ProductsMongoAtlas {
  constructor() {
    this.lastId = this.getLastId();
  }

  async getLastId() {
    const foundId = await Products.find().sort({ _id: -1 }).limit(1);
    foundId[0] ? (this.lastId = foundId[0]._id) : (this.lastId = 1);
  }

  async insertProduct(data) {
    this.lastId++;

    try {
      await Products.create({
        _id: this.lastId,
        title: data.title,
        price: data.price,
        thumbnail: data.thumbnail,
        stock: data.stock,
      });
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async updateById(productId, data) {
    const { title, price, thumbnail, stock } = data;
    const dataToUpdate = {};

    if (title) dataToUpdate.title = title;
    if (price) dataToUpdate.price = price;
    if (thumbnail) dataToUpdate.thumbnail = thumbnail;
    if (stock) dataToUpdate.stock = stock;

    try {
      const updated = await Products.findByIdAndUpdate(productId, {
        dataToUpdate,
      });

      return `Producto (id = ${productId}) actualizado`;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async getProducts() {
    try {
      const allProducts = await Products.find();
      return allProducts;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async getProductById(productId) {
    try {
      const product = await Products.findOne({ _id: productId });
      return product;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }

  async deleteById(productId) {
    try {
      const deleted = await Products.deleteOne({ _id: productId });

      if (deleted) return `Producto (id = ${productId}) eliminado`;
    } catch (err) {
      logger.error(`Products Error: ${err}`);
    }
  }
}

module.exports = { ProductsMongoAtlas };
