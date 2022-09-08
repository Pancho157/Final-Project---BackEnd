const { fs } = require("fs");
const products = require("./products_controller");

class CartTemplate {
  static count = 0; // Almacena la cantidad de veces que se creó una instancia de la clase

  constructor(route) {
    this.route = route;
    this.cartId = ++this.constructor.count; //Pre incrementa el contador antes de utilizarlo
    this.timestapm = new Date().toDateString();
    this.cartProducts = [];
  }

  async saveCartProducts() {
    // TODO: hacer que se guarden los productos con persistencia permanente
    let carts;
    try {
      // Obtenemos la información (JSON)
      const jsonInfo = await fs.readFile(cartsFile, "utf-8", (err, data) => {
        return data;
      });

      carts = JSON.parse(jsonInfo); // Devuelve la informacion parseada
    } catch (error) {
      console.error(`El error es: ${error}`);
    }

    // Cambia los productos del array
    const cartIndex = carts.findIndex((cart) => {
      return cart.cartId == id;
    });
    carts[cartIndex].cartProducts = this.cartProducts;

    // Guarda todos los carritos, con los cambios a los productos
    try {
      await fs.writeFile(this.route, JSON.stringify(carts, null, 2));
      return `Se guardó el carrito con el id: ${carts[cartIndex].cartId}`;
    } catch {
      return `Error al guardar el carrito: ${Error}`;
    }
  }

  async addProductToCart(productId) {
    const product = products.getById(productId);

    if (product) {
      this.cartProducts.push(product);
      await this.saveCartProducts();
      return this.cartProducts;
    } else {
      return `No se ha encontrado el producto con ID = ${productId}`;
    }
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
    } else {
      this.cartProducts = products;
    }

    await this.saveCartProducts();
  }
}

module.exports = CartTemplate;
