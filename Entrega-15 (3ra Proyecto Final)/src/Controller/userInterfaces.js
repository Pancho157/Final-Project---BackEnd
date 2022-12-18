const { logger } = require("../../loggers-testing/loggers/log4js-config");
const { login, getUserInfoFromDB } = require("../Service/DB Querys/login-user");
const { registerUser } = require("../Service/DB Querys/register-user");

// -------------------- CONTENT PAGES --------------------
function getLandingPage(req, res) {
  if (req.session.userName == undefined) {
    res.redirect("/login");
  } else {
    res.render("menu", { name: req.session.userName });
  }
}

function getProductsPage(req, res) {
  if (req.session.userName == undefined) {
    res.redirect("/login");
  } else {
    res.render("products", { name: req.session.userName });
  }
}

function getChatPage(req, res) {
  if (req.session.userName == undefined) {
    res.redirect("/login");
  } else {
    res.render("chat", { name: req.session.userName });
  }
}

async function getUserInfo(req, res) {
  let userInfo;
  if (req.session.userName == undefined) {
    res.redirect("/login");
  } else {
    try {
      userInfo = await getUserInfoFromDB(req.session.userName);
    } catch (err) {
      res.status(err.errorCode).send(err.error);
    }

    res.render("userInfo", {
      name: req.session.userName,
      alias: userInfo.alias,
      email: userInfo.email,
      direction: userInfo.direction,
      age: userInfo.age,
      phoneNum: `xxxx-xxxx${userInfo.phoneNum}`,
    });
  }
}

// ----------------- LOGIN --------------------
function getLoginPage(req, res) {
  if (req.session?.userName) {
    res.redirect("/");
  } else {
    res.render("loginForm");
  }
}

async function postLoginForm(req, res) {
  let loggedIn;
  try {
    loggedIn = await login(req.body);
  } catch (err) {
    res.render("loginError", err);
  }

  if (loggedIn) {
    req.session.userName = loggedIn.alias;
    req.session.userId = loggedIn.userId;
    res.redirect("/");
  }
}

// -------------------- LOGOUT --------------------

function logOut(req, res) {
  const userName = req.session.userName;
  req.session.destroy((err) => {
    if (err) {
      res.send({ Error: true, message: err.message });
    }
  });
  res.render("logOut", { name: userName });
}

// -------------------- REGISTER --------------------

function getRegisterForm(req, res) {
  res.render("registerForm");
}

async function postRegisterForm(req, res) {
  try {
    const response = await registerUser(req.body);
    req.session.userName = response;
    res.redirect("/");
  } catch (err) {
    res.render("registerError", err);
  }
}

module.exports = {
  getLandingPage,
  getProductsPage,
  getChatPage,
  getUserInfo,
  getLoginPage,
  postLoginForm,
  logOut,
  getRegisterForm,
  postRegisterForm,
};
