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
    },
    async (email, password, done) => {
      try {
        const encryptedPass = md5(password);
        const user = await Users.create({ email, password: encryptedPass });
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
        const user = await Users.findByEmail(email);

        if (!user.email) {
          return done(null, false, {
            error: "No se encontró el usuario especificado",
            errorCode: 400,
          });
        }

        if (md5(password) != user.password) {
          return done(null, false, {
            error: "Contraseña incorrecta",
            errorCode: 401,
          });
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
