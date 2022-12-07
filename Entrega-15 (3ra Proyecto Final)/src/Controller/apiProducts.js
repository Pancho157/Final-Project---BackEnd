const { productsDao } = require("../Persistence/DAOs/DAOselector");

async function getProducts(req, res) {
  try {
    const products = await productsDao.getProducts();
    res.json(products);
  } catch (err) {
    logger.error(err);
  }
}

async function postProduct(req, res) {
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
}

module.exports = { getProducts, postProduct };
