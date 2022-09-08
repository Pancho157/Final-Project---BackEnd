const express = require("express");
const apiCarts = express.Router();
const {
  addCart,
  deleteCartById,
  getProductsFromCart,
  deleteCartProductById,
  addCartProductById,
} = require("../controllers/carts_controller");

const route = "./data/carts.txt";

// Crea un carrito y devuelve su id
apiCarts.post("/", async (req, res) => {
  // Trae todos los carritos
  try {
    const response = await addCart();
    res.send(response);
  } catch (err) {
    res.status(500).end(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.delete("/:id", async (req, res) => {
  // Vacía un carrito y lo elimina
  try {
    const response = await deleteCartById(req.params.id);
    res.send(response);
  } catch (err) {
    res.status(500).end(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.get("/:id/productos", async (req, res) => {
  // Lista todos los productos de un carrito (:id = carrito)
  try {
    const response = await getProductsFromCart(req.params.id);
    res.send(response);
  } catch (err) {
    res.status(500).end(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.post("/:id/productos", async (req, res) => {
  // Sumar productos a un carrito
  try {
    const response = await addCartProductById(req.params.id);
    res.send(response);
  } catch (err) {
    res.status(500).end(`UPS: Hubo un error ${err}`);
  }
});

apiCarts.delete("/:id/productos/:id__prod", async (req, res) => {
  // Elimina un producto del carrito
  try {
    const response = await deleteCartProductById(req.params.id);
    res.send(response);
  } catch (err) {
    res.status(500).end(`UPS: Hubo un error ${err}`);
  }
});

module.exports = apiCarts;
