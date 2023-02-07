const { Router } = require("express");
const {
  getChatPage,
  getUserMessagesPage,
} = require("../3-controllers/chat_controller");

const chat = Router();

chat.get("/", getChatPage);

chat.get("/:email", getUserMessagesPage);

module.exports = { chat };
