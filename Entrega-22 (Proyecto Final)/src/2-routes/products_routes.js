const { Router } = require("express");
const passport = require("passport");
const {
  getAllProducts,
  findProductById,
  findProductsByCategory,
  newProduct,
  sendNewProductResponse,
  updateProduct,
  deleteProductById,
} = require("../3-controllers/products_controller");
const { upload } = require("../4-service/middlewares/save_image");
const { verifyIfAdmin } = require("../4-service/middlewares/verify_if_admin");

const crudProducts = Router();

crudProducts.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllProducts
);

crudProducts.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  findProductById
);

crudProducts.get(
  "/:category/categoria",
  passport.authenticate("jwt", { session: false }),
  findProductsByCategory
);

// Below endpoints require admin (post, put, delete)
crudProducts.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  verifyIfAdmin,
  newProduct,
  upload,
  sendNewProductResponse
);

crudProducts.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  verifyIfAdmin,
  updateProduct
);

crudProducts.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  verifyIfAdmin,
  deleteProductById
);

module.exports = { crudProducts };
