const Products = require("../4-service/products_logic");

const products = new Products();

async function getAllProducts(req, res) {
  const allProducts = await products.getAll();
  res.send(allProducts);
}

async function findProductById(req, res) {
  const product = await products.getById(req.params.id);
  res.send(product);
}

async function findProductsByCategory(req, res) {
  const productsByCat = await products.getByCategory(req.params.category);
  res.send(productsByCat);
}

async function newProduct(req, res) {
  const { title, price, thumbnail, stock, category } = req.body;

  if (!title || !price || !thumbnail || !stock || !category) {
    res.render("error", {
      error:
        "No se ingresó toda la información necesaria para generar el producto",
      errorCode: 400,
    });
  }

  res.send(await products.create({ title, price, thumbnail, stock, category }));
}

async function updateProduct(req, res) {
  if (!req.body.id) {
    res.render("error", { error: "No se ingresó ningún id", errorCode: 400 });
  } else if (Object.keys(req.body).length === 1) {
    res.render("error", {
      error: "No se envio información para actualizar el producto",
      errorCode: 400,
    });
  }

  const id = req.body.id;
  delete req.body.id; // Para no generar la propiedad "id"

  res.send(await products.update(id, req.body));
}

async function deleteProductById(req, res) {
  const response = await products.deleteById(req.params.id);
  if (response.deletedCount > 0) {
    res.send("Se ha eliminado el producto exitosamente");
  }
  res.render("error", {
    error: "No se encontró el producto especificado",
    errorCode: 400,
  });
}

module.exports = {
  getAllProducts,
  findProductById,
  findProductsByCategory,
  newProduct,
  updateProduct,
  deleteProductById,
};

// Clase 42
// Clase 36
// Clase 28
// Clase 26
