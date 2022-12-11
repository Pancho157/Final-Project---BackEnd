const { logger } = require("../../loggers-testing/loggers/log4js-config");
const {
  getAllProducts,
  insertProduct,
  deleteProductById,
} = require("../Service/DB Querys/products");

async function getProducts(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function postProduct(req, res) {
  try {
    const product = await insertProduct(req.body);
    res.send(product);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

async function deleteProduct(req, res) {
  try {
    const id = parseInt(req.params.id);
    const productToDelete = await deleteProductById(id);
    res.send(`Se eliminó exitosamente el producto con id = ${id}`);
  } catch (err) {
    logger.error(err);
    res.status(err.errorCode).send(err.error);
  }
}

module.exports = { getProducts, postProduct, deleteProduct };
