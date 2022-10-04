const express = require("express");
const apiCarts = express.Router();

const dao = require("../DBs/DAOs/DAOselector");

apiCarts.post("/", async (req, res) => {
  // Crea un carrito y devuelve su id
  try {
    const response = await dao.cartsDao.addCart();
    res.send(response);
  } catch (err) {
    res.send(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.delete("/:id", async (req, res) => {
  // Vacía un carrito y lo elimina
  try {
    const response = await dao.cartsDao.deleteCartById(req.params.id);
    res.send(response);
  } catch (err) {
    res.send(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.get("/:id/productos", async (req, res) => {
  // Lista todos los productos de un carrito (:id = carrito)
  try {
    const response = await dao.cartsDao.getProductsFromCart(req.params.id);
    res.send(response);
  } catch (err) {
    res.send(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.post("/:id/productos", async (req, res) => {
  // Sumar productos a un carrito
  try {
    const response = await dao.cartsDao.addCartProductById(
      req.params.id,
      req.body.id
    );
    res.send(response);
  } catch (err) {
    res.send(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.delete("/:id/productos/:id__prod", async (req, res) => {
  // Elimina un producto del carrito
  try {
    const response = await dao.cartsDao.deleteCartProductById(
      req.params.id,
      req.params.id__prod
    );
    res.send(response);
  } catch (err) {
    res.send(`UPS: Hubo un error ${err}`);
  }
});

module.exports = apiCarts;
