const { Router } = require("express");
const passport = require("passport");
const {
  getChatPage,
  getUserMessagesPage,
} = require("../3-controllers/chat_controller");

const chat = Router();

chat.get("/", passport.authenticate("jwt", { session: false }), getChatPage);

chat.get(
  "/:email",
  passport.authenticate("jwt", { session: false }),
  getUserMessagesPage
);

module.exports = { chat };
