const passport = require("passport");
const { UserControllerMongo } = require("../DB/DAOs/Users/UsersController");
const PassportLocal = require("passport-local").Strategy;

const Users = new UserControllerMongo();

// Done parameters = (err, user, pass)
passport.use(
  new PassportLocal(async function (user, userPass, done) {
    let userExists;

    try {
      // user = email || alias
      userExists = await Users.findOne({
        $or: [{ email: user }, { alias: user }],
      });

      if (!userExists) {
        done(null, false, "El usuario ingresado no existe");
      }
    } catch (err) {
      done(err.message, false);
    }

    // Comparacion de contraseñas (email encontrado)
    if (md5(userPass) == userExists.password) {
      done(null, { alias: userExists.alias });
    }

    // usuario o contraseña incorrecto
    done(null, false, "Contraseña incorrecta");
  })
);

passport.serializeUser((user, done) => {
  done(null, user.alias);
});

passport.deserializeUser(async (alias, done) => {
  const user = await Users.findOne({ alias: alias });
  done(null, user);
});
