const { Router } = require("express");
const { UserControllerMongo } = require("../DB/DAOs/Users/UsersController");
const { loggerInfo } = require("../middlewares/infoLogger");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

const userInterfaces = Router();
let Users = new UserControllerMongo();

userInterfaces.use(loggerInfo);

// -------------------- TABLA DE PRODUCTOS Y CHAT --------------------
userInterfaces.get("/", (req, res) => {
  if (req.session.userName == undefined) {
    res.redirect("/login");
  } else {
    res.render("index", { name: req.session.userName });
  }
});

// ----------------- LOGIN --------------------
userInterfaces.get("/login", (req, res) => {
  if (req.session?.userName) {
    res.redirect("/");
  } else {
    res.render("loginForm");
  }
});

// ----------------
userInterfaces.post("/login", async (req, res) => {
  const { user, userPass } = req.body;
  let response;

  try {
    response = await Users.verifyUser(user, userPass);
  } catch (err) {
    res.send({ Error: true, message: err.message });
  }

  if (typeof response == "string") {
    res.render("loginError");
  } else {
    req.session.userName = response.alias;
    res.redirect("/");
  }
});

// -------------------- LOGOUT --------------------
userInterfaces.get("/logout", isLoggedIn, (req, res) => {
  const userName = req.session.userName;
  req.session.destroy((err) => {
    if (err) {
      res.send({ Error: true, message: err.message });
    }
  });
  res.render("logOut", { name: userName });
});

// -------------------- REGISTER --------------------
userInterfaces.get("/register", (req, res) => {
  res.render("registerForm");
});

userInterfaces.post("/register", async (req, res) => {
  const { userEmail, userAlias, userPass } = req.body;
  let response;

  try {
    response = await Users.createUser(userAlias, userEmail, userPass);
  } catch (err) {
    res.send({ error: true, message: err.message });
  }

  //  En caso de existir un email y/o alias la respuesta es un objeto con el valor encontrado
  if (response.alias || response.email) {
    res.render("registerError", {
      email: response.email,
      alias: response.alias,
    });
  } else {
    req.session.userName = response.newUserAlias;
  }
});

module.exports = userInterfaces;
