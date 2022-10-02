const isAdmin = true;

function adminVerif(req, res, next) {
  if (!isAdmin) {
    res.status(401).end({
      error: "-1",
      descripción: `ruta ${req.url} - método ${req.method} - no autorizada`,
    });
  } else {
    next();
  }
}

module.exports = adminVerif;
