const { promises: fs } = require("fs");
const products = require("./products_controller");

class CartTemplate {
  static count = 0; // Almacena la cantidad de veces que se creó una instancia de la clase

  constructor(route) {
    this.route = route;
    this.cartId = ++this.constructor.count; //Pre incrementa el contador antes de utilizarlo
    this.timestapm = new Date().toDateString();
    this.cartProducts = [];
  }

  async saveCartProducts(cartProducts) {}

  async addProductToCart(productId) {
    try {
      const carts = await this.getCarts();
    } catch (err) {
      return err;
    }

    const product = products.getById(productId);

    if (product) this.cartProducts.push(product);
  }

  async getProducts() {
    return this.cartProducts;
  }

  async deleteProductById(id) {
    let products = this.cartProducts.filter((product) => {
      if (product.id != id) return product;
    });

    if (products.length == this.cartProducts.length) {
      return `No se ha encontrado un producto con el ID = ${id}`;
    }

    this.saveCartProducts(products);
  }
}

module.exports = CartTemplate;
