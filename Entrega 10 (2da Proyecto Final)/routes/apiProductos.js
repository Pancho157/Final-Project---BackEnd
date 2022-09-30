const express = require("express");
const apiProducts = express.Router();
import { productosDao as products } from "../DBs/DAOs/DAOselector";
import adminVerif from "./adminVerif";

// Lista todos los productos o uno solo por su id
apiProducts.get("/:id", async (req, res) => {
  if (req.params.id == "all") {
    // /api/productos/all --> Devuelve todos los productos
    try {
      const allProducts = await products.getAll();
      res.send(allProducts);
    } catch (err) {
      console.log(err);
    }
  } else {
    // /api/productos/:id --> Devuelve el producto con ese id
    try {
      const product = await products.getById(req.params.id);
      if (product) {
        res.send(product);
      } else {
        res
          .status(400)
          .send("No se ha encontrado el producto que estás buscando");
      }
    } catch (err) {
      console.log(err);
    }
  }
});

// Incorpora productos al listado (solo para administradores)
// Products structure --> id, timestamp, title, description, code, thumbnail, price, stock
apiProducts.post("/", adminVerif, async (req, res) => {
  const { title, description, thumbnail, price, stock } = req.body;

  if (!title || !description || !thumbnail || !price || !stock) {
    res.status(400).end("No se rellenaron todos los campos requeridos");
  } else {
    try {
      const response = await products.save({
        title: title,
        price: price,
        thumbnail: thumbnail,
        description: description,
        stock: stock,
      });

      res.send(response);
    } catch (err) {
      res.send(`${err}`);
    }
  }
});

apiProducts.put("/:id", adminVerif, async (req, res) => {
  // Actualiza un producto (solo para administradores)
  const { title, description, thumbnail, price, stock } = req.body;

  if (!title && !description && !thumbnail && !price && !stock) {
    res.status(400).end("No se envió información para actualizar el producto");
  } else {
    try {
      const response = await products.update(req.params.id, req.body);
      res.send(response);
    } catch (err) {
      res.send(`${err}`);
    }
  }
});

apiProducts.delete("/:id", adminVerif, async (req, res) => {
  // Elimina un producto (solo para administradores)
  try {
    const response = await products.deleteById(req.params.id);
    res.send(response);
  } catch (err) {
    res.send(`${err}`);
  }
});

module.exports = apiProducts;
