const { promises: fs } = require("fs");
const md5 = require("md5");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(newObject) {
    // Obtiene los datos del archivo con los productos
    let objetos = [];
    try {
      objetos = await this.getAll();
    } catch {
      return `Error al traer los productos: ${Error}`;
    }

    let isUnique = objetos.find((product) => product.title === newObject.title);
    if (isUnique !== undefined) {
      return `Ya existe el producto ingresado`;
    }

    // Obtiene el último ID y genera el siguiente
    let newId;
    if (objetos.length == 0) {
      newId = 1;
    } else {
      const lastId = objetos[objetos.length - 1].id;
      newId = lastId + 1;
    }

    const timestamp = new Date().toDateString();
    const code = md5(newId); // Encripta el código (es igual al id de producto)

    // Agrega el nuevo objeto al array que se sube al archivo
    objetos.push({ ...newObject, id: newId, timestamp: timestamp, code: code });

    try {
      await fs.writeFile(this.ruta, JSON.stringify(objetos, null, 2));
      return `Se guardó el producto con el id: ${newId}`;
    } catch (err) {
      return `Error al guardar: ${err}`;
    }
  }

  async getById(id) {
    let products;
    try {
      products = await this.getAll();
    } catch {
      return `Error al traer los productos: ${Error}`;
    }
    const filteredProduct = products.find((product) => product.id == id);

    if (filteredProduct) {
      console.log(`Devuelto el elemento con ID = ${id}`);
      return filteredProduct;
    } else {
      return "No se ha encontrado el producto solicitado";
    }
  }

  async getAll() {
    try {
      const objetos = await fs.readFile(this.ruta, "utf-8");
      return JSON.parse(objetos);
    } catch {
      return [];
    }
  }

  async deleteById(id) {
    let products;

    try {
      products = await this.getAll();
    } catch {
      return `Error al traer los productos: ${Error}`;
    }

    const filteredProducts = products.filter((product) => product.id != id);

    if (filteredProducts.length === products.length) {
      return `Error al borrar: No se encontró el id ingresado (${id})`;
    }

    try {
      await fs.writeFile(this.ruta, JSON.stringify(filteredProducts, null, 2));
      return `Eliminado el elemento con el ID = ${id}`;
    } catch {
      return `Error al guardar: No fue posible eliminar el producto (${id})`;
    }
  }

  async update(id, newInfo) {
    let objets = [];
    try {
      objets = await products.getAll();
    } catch (err) {
      return err;
    }
    const { title, price, thumbnail, description, stock } = newInfo;
    let productIndex = objets.findIndex((product) => {
      return product.id == id;
    });

    if (productIndex == -1) {
      return `No se encontró un producto con el ID ingresado ( ${id} )`;
    } else if (!title && !description && !thumbnail && !price && !stock) {
      return `No se ingresaron datos para actualizar el producto`;
    } else {
      if (title) {
        objets[productIndex].title = title;
      }
      if (price) {
        objets;
        objets[productIndex].price = price;
      }
      if (thumbnail) {
        objets;
        objets[productIndex].thumbnail = thumbnail;
      }
      if (description) {
        objets;
        objets[productIndex].description = description;
      }
      if (stock) {
        objets;
        objets[productIndex].stock = stock;
      }

      try {
        await fs.writeFile(this.ruta, JSON.stringify(objets, null, 2));
        return `Se actualizó el producto con el id: ${objets[productIndex].id}`;
      } catch (err) {
        return `Error al guardar: ${err}`;
      }
    }
  }
}

const products = new Contenedor("./data/products.txt");

module.exports = products;
