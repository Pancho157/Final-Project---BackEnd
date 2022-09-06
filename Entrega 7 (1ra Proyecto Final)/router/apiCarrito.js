const express = require("express");
const cart = express.Router();

cart.post("/", (req, res) => {
  // Crea un carrito y devuelve su id
});

cart.delete("/:id", (req, res) => {
  // Vacía un carrito y lo elimina
});

cart.get("/:id/productos", (req, res) => {
  // Lista todos los productos de un carrito (:id = carrito)
});

cart.post("/:id/productos", (req, res) => {
  // Sumar productos a un carrito
});

cart.delete("/:id/productos/:id__prod", (req, res) => {
  // Elimina un producto del carrito
});

module.exports = cart;
