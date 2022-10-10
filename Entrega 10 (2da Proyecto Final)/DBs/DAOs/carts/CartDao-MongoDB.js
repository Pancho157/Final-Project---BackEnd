// Funciones de los carritos:
//    getCarts() {}
//    addCart() {}
//    deleteCartById(id) {}
//    getProductsFromCart(id) {}
//    deleteCartProductById(cartId, productId) {}
//    addCartProductById(cartId, productId) {}

const { Cart, Product } = require("../../utils/mongoSchemasModels");

class CartsControllerMongo {
  constructor() {}

  async getCarts() {
    try {
      let carts = await Cart.find();
      console.log(carts);
    } catch (err) {
      console.log(err.message);
    }
  }

  async addCart() {
    try {
      let lastCart = await Cart.find().sort({ _id: -1 }).limit(1);
      // Devuelve el último id + 1 como string
      const newId = `${parseInt(lastCart[0]._id) + 1}`;

      const cart = await Cart.create({ _id: newId, cartProducts: [] });
      return newId;
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteCartById(id) {
    try {
      const cartRemoved = await Cart.deleteOne({ _id: `${id}` });
      return id;
    } catch (err) {
      console.log(err.message);
    }
  }

  async getProductsFromCart(id) {
    try {
      let lastCart = await Cart.find({ _id: `${id}` });
      const cartProducts = lastCart[0].cartProducts;
      return cartProducts;
    } catch (err) {
      console.log(err.message);
    }
  }

  async deleteCartProductById(cartId, productId) {
    try {
      await Cart.updateOne(
        { _id: cartId },
        { $pull: { cartProducts: `${productId}` } }
      );
    } catch (err) {
      console.log(err.message);
    }

    return "Producto eliminado";
  }

  async addCartProductById(cartId, productId) {
    try {
      await Cart.updateOne(
        { _id: cartId },
        { $push: { cartProducts: `${productId}` } }
      );
    } catch (err) {
      console.log(err.message);
    }

    return "Producto agregado al carrito";
  }
}

module.exports = { CartsControllerMongo };
