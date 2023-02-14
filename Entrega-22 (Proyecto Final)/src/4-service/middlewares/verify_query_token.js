function verifyQueryTokenLogin(req, res, next) {
  if (req.query.token) {
    res.redirect(`/productos?token=${req.query.token}`);
  } else {
    next();
  }
}

module.exports = { verifyQueryTokenLogin };
