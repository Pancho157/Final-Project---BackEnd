const express = require("express");
const apiProducts = express.Router();
const products = require("../controllers/products_controller");

const administrador = true;

// Lista todos los productos o uno solo por su id
// /api/productos/all --> Devuelve todos los productos
apiProducts.get("/:id", async (req, res) => {
  if (req.params.id == "all") {
    const allProducts = await products.getAll();
    res.send(allProducts);
  } else {
    const product = await products.getById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res
        .status(400)
        .send("No se ha encontrado el producto que estás buscando");
    }
  }
});

// Incorpora productos al listado (solo para administradores)
// Products structure --> id, timestamp, title, description, code, thumbnail, price, stock
apiProducts.post("/", async (req, res) => {
  if (administrador) {
    const { title, description, thumbnail, price, stock } = req.body;

    if (!title || !description || !thumbnail || !price || !stock) {
      res.status(400).end("No se rellenaron todos los campos requeridos");
    } else {
      const response = await products.save({
        title: title,
        price: price,
        thumbnail: thumbnail,
        description: description,
        stock: stock,
      });

      res.send(response);
    }
  } else {
    res.status(401).end("Funcionalidad disponible solo para administradores");
  }
});

apiProducts.put("/:id", async (req, res) => {
  // Actualiza un producto (solo para administradores)
});

apiProducts.delete("/:id", async (req, res) => {
  // Elimina un producto (solo para administradores)
});

module.exports = apiProducts;
