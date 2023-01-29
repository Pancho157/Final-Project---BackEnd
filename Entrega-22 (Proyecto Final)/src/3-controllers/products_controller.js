const Products = require("../4-service/products_logic");

const products = new Products();

async function getAllProducts(req, res) {
  const allProducts = await products.getAll();
  res.send(allProducts);
}

async function findProductById(req, res) {
  res.send("Funciona?");
}

async function newProduct(req, res) {
  res.send("Funciona?");
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
