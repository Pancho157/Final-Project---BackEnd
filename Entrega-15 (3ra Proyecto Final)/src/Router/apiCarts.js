const { Router } = require("express");

// Controllers
const {
  addProductToCart,
  deleteProductFromCart,
} = require("../Controller/carts");

// Middlewares
const { isLoggedIn } = require("../Service/middlewares/isLoggedIn");

const carts = Router();

carts.post("/", isLoggedIn, addProductToCart);

carts.delete("/", isLoggedIn, deleteProductFromCart);

module.exports = { carts };
