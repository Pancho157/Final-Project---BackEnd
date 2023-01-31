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

async function newProduct(req, res) {
  const { title, price, thumbnail, stock } = req.body;

  if (!title || !price || !thumbnail || !stock) {
    res.send("Faltan ingresar datos del producto");
  }

  res.send(await products.create({ title, price, thumbnail, stock }));
}

async function deleteProductById(req, res) {
  res.send("Funciona?");
}

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
  deleteProductById,
};
