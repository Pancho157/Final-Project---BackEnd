const { Router } = require("express");

// Controllers
const {
  getLandingPage,
  getLoginPage,
  postLoginForm,
  logOut,
  getRegisterForm,
  postRegisterForm,
} = require("../Controller/userInterfaces");

// Middlewares
const { loggerInfo } = require("../Service/middlewares/infoLogger");
const { isLoggedIn } = require("../Service/middlewares/isLoggedIn");

const userInterfaces = Router();
userInterfaces.use(loggerInfo);

// -------------------- CONTENT PAGES --------------------
userInterfaces.get("/", getLandingPage);

// ----------------- LOGIN --------------------
userInterfaces.get("/login", getLoginPage);

userInterfaces.post("/login", postLoginForm);

// -------------------- LOGOUT --------------------
userInterfaces.get("/logout", isLoggedIn, logOut);

// -------------------- REGISTER --------------------
userInterfaces.get("/register", getRegisterForm);

userInterfaces.post("/register", postRegisterForm);

module.exports = userInterfaces;
