const { Router } = require("express");
const {
  getCart,
  insertOneToCart,
  removeOneFromCart,
  deleteProductFromCart,
} = require("../3-controllers/carts_controller");

const carts = Router();

carts.get("/", getCart);

carts.post("/", insertOneToCart);

carts.delete("/:id", removeOneFromCart);

carts.delete("/:id", deleteProductFromCart);

module.exports = { carts };
