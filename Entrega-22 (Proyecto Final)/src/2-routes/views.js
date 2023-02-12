const { Router } = require("express");

const {
  getLoginRegisterPage,
  getChatPage,
  getUserMessagesPage,
} = require("../3-controllers/views.js");

const views = Router();

views.get("/", getLoginRegisterPage);

views.get("/chat", getChatPage);

views.get("/chat/:email", getUserMessagesPage);

module.exports = { views };
