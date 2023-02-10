const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const auth = Router();

// ------------- Post - Register -------------
auth.post(
  "/register",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Signup successful",
      user: req.user,
    });
  }
);

// ------------- Post - Login -------------
auth.post("/", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        logger.error(err);
        return res.render("error", {
          error: user ? err.error : "Usuario no especificado",
          errorCode: user ? err.status : 400,
        });
      }

      req.login(user, { session: false }, async (err) => {
        if (err) {
          return res.render("error", {
            error: err.error,
            errorCode: err.errorCode,
          });
        }

        const body = {
          id: user._id,
          name: user.fullname.name,
          email: user.email,
          thumbnail: user.thumbnail,
          rol: user.rol,
        };

        const token = jwt.sign({ user: body }, "top_secret_secret_key");

        return res.json({ token });
      });
    } catch (err) {
      return res.render("error", {
        error: err.error,
        errorCode: err.errorCode,
      });
    }
  })(req, res, next);
});

// ------------- Authenticate token -------------
auth.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
      token: req.query.secret_token,
    });
  }
);

module.exports = { auth };
