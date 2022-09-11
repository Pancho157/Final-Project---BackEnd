const express = require("express");
const apiProducts = express.Router();
const products = require("../controllers/products_controller");

const administrador = true;
const route = "/api/productos";

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
apiProducts.post("/", async (req, res) => {
  if (!administrador) {
    res.status(401).end({
      error: "-1",
      descripción: `ruta ${route} - método POST - no autorizada`,
    });
  }

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

      if (response == "Ya existe el producto ingresado") {
        res.status(400).send(response);
      }

      res.send(response);
    } catch (err) {
      console.log(err);
    }
  }
});

apiProducts.put("/:id", async (req, res) => {
  // Actualiza un producto (solo para administradores)
  if (!administrador) {
    res.status(401).end({
      error: "-1",
      descripción: `ruta ${route} - método PUT - no autorizada`,
    });
  }

  const { title, description, thumbnail, price, stock } = req.body;

  if (!title && !description && !thumbnail && !price && !stock) {
    res.status(400).end("No se rellenaron todos los campos requeridos");
  } else {
    try {
      const response = await products.update(req.params.id, req.body);

      if (
        response ==
        `No se encontró un producto con el ID ingresado ( ${req.params.id} )`
      ) {
        res.status(400).send(response);
      }

      res.send(response);
    } catch (err) {
      res.status(400).end(`${err}`);
    }
  }
});

apiProducts.delete("/:id", async (req, res) => {
  // Elimina un producto (solo para administradores)
  if (!administrador) {
    res.status(401).send({
      error: "-1",
      descripción: `ruta ${route} - método DELETE - no autorizada`,
    });
  }
  try {
    const response = await products.deleteById(req.params.id);
    res.send(response);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
});

module.exports = apiProducts;
