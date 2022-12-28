const { Router } = require("express");

// Controllers
const { getUserCartProducts } = require("../Controller/api-carts");
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
} = require("../Controller/user-interfaces");

// Middlewares
const { loggerInfo } = require("../Service/middlewares/infoLogger");
const { isLoggedIn } = require("../Service/middlewares/isLoggedIn");
const { upload } = require("../Service/middlewares/multer");
const {
  getPhotoPathAsReqBody,
} = require("../Service/middlewares/getLastImagePath");

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

userInterfaces.post(
  "/register",
  upload,
  getPhotoPathAsReqBody,
  postRegisterForm
);

module.exports = userInterfaces;
