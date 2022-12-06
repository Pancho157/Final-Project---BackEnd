const { Router } = require("express");
const { productsDao } = require("../DB/DAOs/DAOselector");
const { logger } = require("../loggers/log4js-config");

const apiProducts = Router();

apiProducts.get("/products", async (req, res) => {
  try {
    const products = await productsDao.getProducts();
    res.json(products);
  } catch (err) {
    logger.error(err);
  }
});

apiProducts.post("/products", async (req, res) => {
  const { title, price, thumbnail, stock } = req.body;

  if (!title || !price || !thumbnail || !stock) {
    res.send("ingrese todos los datos necesarios");
  }

  try {
    const product = await productsDao.insertProduct(req.body);
    res.send("producto agregado exitosamente");
  } catch (err) {
    logger.error(err);
  }
});

module.exports = { apiProducts };
