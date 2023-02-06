const { Router } = require("express");
const {
  getAllProducts,
  findProductById,
  findProductsByCategory,
  newProduct,
  sendNewProductResponse,
  updateProduct,
  deleteProductById,
} = require("../3-controllers/products_controller");
const { upload } = require("../4-service/middlewares/saveImage");

const crudProducts = Router();

crudProducts.get("/", getAllProducts);

crudProducts.get("/:id", findProductById);

crudProducts.get("/:category/categoria", findProductsByCategory);

crudProducts.post("/", newProduct, upload, sendNewProductResponse);

crudProducts.put("/", updateProduct);

crudProducts.delete("/:id", deleteProductById);

module.exports = { crudProducts };
