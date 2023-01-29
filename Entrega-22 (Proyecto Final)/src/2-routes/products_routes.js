const { Router } = require("express");
const {
  getAllProducts,
  findProductById,
  newProduct,
  deleteProductById,
} = require("../3-controllers/products_controller");

const crudProducts = Router();

crudProducts.get("/", getAllProducts);

crudProducts.get("/:id", findProductById);

crudProducts.post("/", newProduct);

crudProducts.delete("/:id", deleteProductById);

module.exports = { crudProducts };
