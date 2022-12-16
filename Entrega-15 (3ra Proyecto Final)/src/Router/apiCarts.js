const { Router } = require("express");

// Controllers
const {
  getUserCartProducts,
  addProductToCart,
  deleteProductFromCart,
  buyUserCart,
} = require("../Controller/carts");

// Middlewares
const { isLoggedIn } = require("../Service/middlewares/isLoggedIn");

const carts = Router();

carts.post("/", isLoggedIn, addProductToCart);

carts.delete("/", isLoggedIn, deleteProductFromCart);

carts.post("/buyCart", isLoggedIn, buyUserCart);

module.exports = { carts };
