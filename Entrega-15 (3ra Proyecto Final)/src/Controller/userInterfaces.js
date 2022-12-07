// -------------------- CONTENT PAGES --------------------
function getLandingPage(req, res) {
  if (req.session.userName == undefined) {
    res.redirect("/login");
  } else {
    res.render("index", { name: req.session.userName });
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
}

module.exports = {
  getLandingPage,
  getLoginPage,
  postLoginForm,
  logOut,
  getRegisterForm,
  postRegisterForm,
};
