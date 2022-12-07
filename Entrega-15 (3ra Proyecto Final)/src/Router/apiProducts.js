const { Router } = require("express");
const { getProducts, postProduct } = require("../Controller/apiProducts");

const apiProducts = Router();

apiProducts.get("/products", getProducts);

apiProducts.post("/products", postProduct);

module.exports = { apiProducts };
