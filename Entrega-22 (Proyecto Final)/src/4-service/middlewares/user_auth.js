const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const md5 = require("md5");
const { UsersQueries } = require("../queries_to_db/users_queries");
const { CartsQueries } = require("../queries_to_db/carts_queries");
const { logger } = require("../../../configs/logger");
const { sendNewUserEmailToAdmin } = require("../../../configs/nodemailer");

const Users = new UsersQueries();
const Carts = new CartsQueries();

// nombre completo, número de teléfono, email, password, carrito y rol
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { name, lastName, phone, rol, deliveryAdress, passwordDup } =
        req.body;

      if (
        !name ||
        !lastName ||
        !phone ||
        !rol ||
        !deliveryAdress ||
        !passwordDup
      ) {
        done({
          error: "No se ingresaron los datos requeridos",
          errorCode: 400,
        });
      }

      if (passwordDup != password) {
        done({
          error: "La contraseña y su duplicado no cohinciden",
          errorCode: 400,
        });
      }

      let cart;
      try {
        cart = await Carts.createCart(email, deliveryAdress);
      } catch (err) {
        logger.error(err);
      }

      const userData = {
        fullname: { name: name, lastName: lastName },
        email: email,
        phone: phone,
        rol: rol,
        userCart: cart._id,
        password: md5(password),
      };

      try {
        const user = await Users.create(userData);
        await sendNewUserEmailToAdmin(user);
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.getByEmail(email);

        if (!user) {
          return done(
            {
              error: "No se encontró el usuario especificado",
              errorCode: 400,
            },
            false
          );
        }

        if (md5(password) != user.password) {
          return done(
            {
              error: "Contraseña incorrecta",
              errorCode: 401,
            },
            false
          );
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: "top_secret_secret_key",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("token"),
    },
    async (token, done) => {
      try {
        return done(null, token.userInfo);
      } catch (err) {
        done(err);
      }
    }
  )
);
