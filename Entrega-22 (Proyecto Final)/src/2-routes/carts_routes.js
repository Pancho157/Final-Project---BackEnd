const { Router } = require("express");
const passport = require("passport");
const {
  getUserCart,
  addOneToCartProduct,
  removeOneFromCartProduct,
  deleteCartProduct,
  buyCart,
} = require("../3-controllers/carts_controller");

const carts = Router();

carts.get("/", passport.authenticate("jwt", { session: false }), getUserCart);

carts.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  addOneToCartProduct
);

carts.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  removeOneFromCartProduct
);

carts.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteCartProduct
);

carts.post(
  "/comprar",
  passport.authenticate("jwt", { session: false }),
  buyCart
);

module.exports = { carts };
