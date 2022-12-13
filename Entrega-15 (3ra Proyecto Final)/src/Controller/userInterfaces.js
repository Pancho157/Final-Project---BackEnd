const { login } = require("../Service/DB Querys/login-user");
const { registerUser } = require("../Service/DB Querys/register-user");

// -------------------- CONTENT PAGES --------------------
function getLandingPage(req, res) {
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
    res.status(err.errorCode).send(err.error);
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
    res.send(await registerUser(req.body));
  } catch (err) {
    console.log(err);
    res.status(err.errorCode).send(err.error);
  }
}

module.exports = {
  getLandingPage,
  getChatPage,
  getLoginPage,
  postLoginForm,
  logOut,
  getRegisterForm,
  postRegisterForm,
};
