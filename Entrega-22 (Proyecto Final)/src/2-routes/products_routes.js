const { Router } = require("express");
const {
  getAllProducts,
  findProductById,
  findProductsByCategory,
  newProduct,
  updateProduct,
  deleteProductById,
} = require("../3-controllers/products_controller");

const crudProducts = Router();

crudProducts.get("/", getAllProducts);

crudProducts.get("/:id", findProductById);

crudProducts.get("/:category/categoria", findProductsByCategory);

crudProducts.post("/", newProduct);

crudProducts.put("/", updateProduct);

crudProducts.delete("/:id", deleteProductById);

module.exports = { crudProducts };
