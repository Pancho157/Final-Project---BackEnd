// Funciones de los productso:
//      save(newObject) {}
//      getById(id) {}
//      getAll() {}
//      deleteById(id) {}
//      update(id, newInfo) {}

const { Product } = require("../../utils/mongoSchemasModels");

class ProductsControllerMongo {
  constructor() {}

  generateCode() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  async save(newProductInfo) {
    const { title, description, thumbnail, price, stock } = newProductInfo;
    let code = this.generateCode();
    let newId;

    try {
      lastProduct = await Product.find().sort({ _id: -1 }).limit(1);
    } catch (err) {
      console.log(err.message);
    }

    try {
      const allProducts = await Product.find();

      if (allProducts[0]) {
        // Devuelve el último id + 1 como string
        const lastProduct = await Product.find().sort({ _id: -1 }).limit(1);
        newId = `${parseInt(lastProduct[0]._id) + 1}`;
      } else {
        newId = "1";
      }

      const product = await Product.create({
        _id: newId,
        title: title,
        description: description,
        thumbnail: thumbnail,
        price: price,
        stock: stock,
        code: code,
      });

      return newId;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getById(id) {
    try {
      let requestedProduct = await Product.find({ _id: `${id}` });
      return requestedProduct;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getAll() {
    try {
      const allProducts = await Product.find();
      return allProducts;
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteById(id) {
    try {
      const productRemoved = await Product.deleteOne({ _id: `${id}` });
      return id;
    } catch (err) {
      console.log(err.message);
    }
  }

  async update(id, newInfo) {
    let infoToUpdate = {};

    if (newInfo.title) infoToUpdate.title = newInfo.title;
    if (newInfo.description) infoToUpdate.description = newInfo.description;
    if (newInfo.thumbnail) infoToUpdate.thumbnail = newInfo.thumbnail;
    if (newInfo.price) infoToUpdate.price = newInfo.price;
    if (newInfo.stock) infoToUpdate.stock = newInfo.stock;

    try {
      await Product.findByIdAndUpdate(`${id}`, infoToUpdate);

      return "Producto actualizado";
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = { ProductsControllerMongo };
