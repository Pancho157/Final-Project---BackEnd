class Products {
  constructor() {
    this.products = [];
    this.lastId = 0;
  }

  add(newProduct) {
    const { title, price, thumbnail } = newProduct;

    if (!title && !price && !thumbnail) {
      throw new Error("No se ha enviado toda la información requerida");
    }

    let isUnique = this.products.find(
      (product) => product.title === newProduct.title
    );

    if (isUnique !== undefined) {
      throw new Error("Este producto ya se encuentra creado");
    }

    // En este caso this hace referencia a la clase, ya que se generó en el constructor
    const productToAdd = { ...newProduct, id: ++this.lastId };
    this.products.push(productToAdd);
    console.log(productToAdd);
    return productToAdd;
  }

  getById(id) {
    const product = this.products.find((product) => {
      if (product.id == id) {
        return product;
      }
    });

    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  getAll() {
    return this.products;
  }

  deleteById(id) {
    const filteredProducts = this.products.filter(
      (product) => product.id != id
    );

    if (filteredProducts.length === this.products.length) {
      throw new Error(
        `No se encontró un producto con el ID ingresado ( ${id} )`
      );
    }

    this.products = filteredProducts;
  }

  update(id, newInfo) {
    const { title, price, thumbnail } = newInfo;
    let productIndex = this.products.findIndex((product) => {
      return product.id == id;
    });

    if (productIndex == -1) {
      throw new Error(
        `No se encontró un producto con el ID ingresado ( ${id} )`
      );
    } else if (!title && !price && !thumbnail) {
      throw new Error(`No se ingresaron datos para actualizar el producto`);
    } else {
      if (title) {
        this.products[productIndex].title = title;
      }
      if (price) {
        this.products[productIndex].price = price;
      }
      if (thumbnail) {
        this.products[productIndex].thumbnail = thumbnail;
      }
    }
  }
}

let products = new Products();

module.exports = products;
