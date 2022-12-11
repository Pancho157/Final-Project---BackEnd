const { productsDao } = require("../../Persistence/DAOs/DAOselector");

async function getAllProducts() {
  try {
    const products = await productsDao.getAll();
    return products;
  } catch (err) {
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }
}

async function insertProduct(data) {
  const { title, price, thumbnail, stock } = data;
  let exists;

  try {
    exists = await productsDao.getProductByTitle(title);
  } catch (err) {
    throw {
      error: "El producto ingresado ya existe",
      errorCode: 400,
    };
  }

  if (!title || !price || !thumbnail || !stock) {
    throw {
      error: "No se ingresaron todos los datos necesarios",
      errorCode: 400,
    };
  } else if (exists != null) {
    throw {
      error: "El producto ingresado ya existe",
      errorCode: 400,
    };
  }

  try {
    const newProduct = await productsDao.insertProduct(data);
    return `Producto agregado exitosamente`;
  } catch (err) {
    console.log(err);
    throw {
      error: "Se ha producido un error al generar el producto",
      errorCode: 500,
    };
  }
}

async function deleteProductById(id) {
  if (!id) {
    throw {
      error: "Ingrese el id del producto a eliminar",
      errorCode: 400,
    };
  }

  try {
    const productToDelete = await productsDao.deleteById(id);
    return `Producto eliminado exitosamente (id = ${id})`;
  } catch (err) {
    throw {
      error: "Ha ocurrido un error al eliminar el producto",
      errorCode: 500,
    };
  }
}

module.exports = { getAllProducts, insertProduct, deleteProductById };
