const { Router } = require("express");

// Controllers
const {
  addOneToCartProduct,
  deleteProductFromCart,
  buyUserCart,
  removeOneOfProduct,
} = require("../Controller/api-carts");

// Middlewares
const { isLoggedIn } = require("../Service/middlewares/isLoggedIn");

const carts = Router();

carts.post("/", isLoggedIn, addOneToCartProduct);

carts.delete("/", isLoggedIn, removeOneOfProduct);

carts.delete("/deleteProduct", isLoggedIn, deleteProductFromCart);

carts.post("/buyCart", isLoggedIn, buyUserCart);

module.exports = { carts };
