const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { logger } = require("../../configs/logger");

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
      if (err) {
        logger.error(err);
        return res.render("error", {
          error: err.error,
          errorCode: err.status,
        });
      }

      req.login(user, { session: false }, async (err) => {
        if (err) {
          logger.error(err);
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

        const expirationTime = process.env.SESSION_TIME || 180;
        const token = jwt.sign({ userInfo: body }, "top_secret_secret_key", {
          expiresIn: expirationTime + "m",
        });

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

module.exports = { auth };
