function sessionVerif(req, res, next) {
  const userName = req.session.userName;
  if (userName == undefined) {
    res.redirect("/login");
  }
  next();
}

module.exports = { sessionVerif };
