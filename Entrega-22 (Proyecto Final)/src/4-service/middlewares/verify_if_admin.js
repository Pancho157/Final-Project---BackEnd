function verifyIfAdmin(req, res, next) {
  if (req.user.rol == "admin") {
    next();
  } else {
    res.render("error", {
      error: "Es requerido ser administrador para realizar la tarea solicitada",
      errorCode: 401,
    });
  }
}

module.exports = { verifyIfAdmin };
