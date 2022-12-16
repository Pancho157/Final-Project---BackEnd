const { Router } = require("express");

// Controllers
const { getUserCartProducts } = require("../Controller/carts");
const {
  getLandingPage,
  getProductsPage,
  getChatPage,
  getLoginPage,
  postLoginForm,
  logOut,
  getRegisterForm,
  postRegisterForm,
  getUserInfo,
} = require("../Controller/userInterfaces");

// Middlewares
const { loggerInfo } = require("../Service/middlewares/infoLogger");
const { isLoggedIn } = require("../Service/middlewares/isLoggedIn");

const userInterfaces = Router();
userInterfaces.use(loggerInfo);

// -------------------- CONTENT PAGES --------------------
userInterfaces.get("/", getLandingPage);
userInterfaces.get("/products", getProductsPage);
userInterfaces.get("/chat", getChatPage);
userInterfaces.get("/userInfo", getUserInfo);
userInterfaces.get("/userCart", isLoggedIn, getUserCartProducts);

// ----------------- LOGIN --------------------
userInterfaces.get("/login", getLoginPage);

userInterfaces.post("/login", postLoginForm);

// -------------------- LOGOUT --------------------
userInterfaces.get("/logout", isLoggedIn, logOut);

// -------------------- REGISTER --------------------
userInterfaces.get("/register", getRegisterForm);

userInterfaces.post("/register", postRegisterForm);

module.exports = userInterfaces;
