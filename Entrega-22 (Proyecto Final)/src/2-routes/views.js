const { Router } = require("express");
const passport = require("passport");

const {
  getLoginRegisterPage,
  getChatPage,
  getUserMessagesPage,
} = require("../3-controllers/views.js");

const views = Router();

views.get("/", getLoginRegisterPage);

views.get(
  "/chat",
  passport.authenticate("jwt", { session: false }),
  getChatPage
);

views.get(
  "/chat/:email",
  passport.authenticate("jwt", { session: false }),
  getUserMessagesPage
);

module.exports = { views };
