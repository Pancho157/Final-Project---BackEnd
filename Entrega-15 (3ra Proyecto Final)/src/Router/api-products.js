const { Router } = require("express");
const { getProducts, postProduct, deleteProduct } = require("../Controller/api-products");

const apiProducts = Router();

apiProducts.get("/products", getProducts);

apiProducts.post("/products", postProduct);

apiProducts.delete("/products/:id", deleteProduct);

module.exports = { apiProducts };
