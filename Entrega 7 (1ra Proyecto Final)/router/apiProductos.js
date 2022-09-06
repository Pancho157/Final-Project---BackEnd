const express = require("express");
const products = express.Router();

products.get("/:id", (req, res) => {
  // Lista todos los productos o uno solo por su id
});

products.post("/", (req, res) => {
  // Incorpora productos al listado (solo para administradores)
});

products.put("/:id", (req, res) => {
  // Actualiza un producto (solo para administradores)
});

products.delete("/:id", (req, res) => {
  // Elimina un producto
});

module.exports = products;
