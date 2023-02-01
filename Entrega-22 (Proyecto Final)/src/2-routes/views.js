const { Router } = require("express");

const {
  getLoginRegisterPage,
  getProductsPage,
  getChatPage,
  getUserMessagesPage,
} = require("../3-controllers/views.js");

const views = Router();

views.get("/", getLoginRegisterPage);

views.get("/vistas/productos", getProductsPage);

views.get("/chat", getChatPage);

views.get("/chat/:email", getUserMessagesPage);

module.exports = { views };
