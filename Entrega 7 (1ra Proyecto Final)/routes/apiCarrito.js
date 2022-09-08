const express = require("express");
const apiCarts = express.Router();
const CartTemplate = require("../controllers/carts_template");
const { addCart } = require("../controllers/carts_controller");

const route = "./data/carts.txt";

// Crea un carrito y devuelve su id
apiCarts.post("/", async (req, res) => {
  // Trae todos los carritos
  try {
    res.send(addCart());
  } catch (err) {
    res.status(500).end(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.delete("/:id", async (req, res) => {
  // Vacía un carrito y lo elimina
});

apiCarts.get("/:id/productos", async (req, res) => {
  // Lista todos los productos de un carrito (:id = carrito)
});

apiCarts.post("/:id/productos", async (req, res) => {
  // Sumar productos a un carrito
});

apiCarts.delete("/:id/productos/:id__prod", async (req, res) => {
  // Elimina un producto del carrito
});

module.exports = apiCarts;
