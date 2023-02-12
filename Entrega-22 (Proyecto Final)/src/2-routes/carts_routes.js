const { Router } = require("express");
const {
  getUserCart,
  addOneToCartProduct,
  removeOneFromCartProduct,
  deleteCartProduct,
  buyCart,
} = require("../3-controllers/carts_controller");

const carts = Router();

carts.get("/", getUserCart);

carts.post("/", addOneToCartProduct);

carts.delete("/", removeOneFromCartProduct);

carts.delete("/:id", deleteCartProduct);

carts.post("/comprar", buyCart);

module.exports = { carts };
