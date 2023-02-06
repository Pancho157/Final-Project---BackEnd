const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const md5 = require("md5");
const { UsersQueries } = require("../queries_to_db/users_queries");

const Users = new UsersQueries();

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
      const { name, lastName, phone, rol } = req.body;

      if (!name || !lastName || !phone || !rol) {
        done("No se ingresaron los datos requeridos");
      }

      const encryptedPass = md5(password);

      const userData = {
        fullname: { name: name, lastName: lastName },
        email: email,
        phone: phone,
        userRol: rol,
        userCart: [],
        password: encryptedPass,
      };

      try {
        const user = await Users.create(userData);
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
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (e) {
        done(error);
      }
    }
  )
);
