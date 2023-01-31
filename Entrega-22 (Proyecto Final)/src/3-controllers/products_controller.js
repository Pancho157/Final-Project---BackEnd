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
    res.send("Faltan ingresar datos del producto");
  }

  res.send(await products.create({ title, price, thumbnail, stock, category }));
}

async function updateProduct(req, res) {
  if (Object.keys(req.body).length === 0) {
    res.send("No se envio información para actualizar el producto");
  } else if (!req.body.id) {
    res.send("No se ingresó nungún id");
  }

  const id = req.body.id;
  delete req.body.id; // Para no generar la propiedad "id"

  res.send(await products.update(id, req.body));
}

async function deleteProductById(req, res) {
  res.send(await products.deleteById(req.params.id));
}

module.exports = {
  getAllProducts,
  findProductById,
  findProductsByCategory,
  newProduct,
  updateProduct,
  deleteProductById,
};
