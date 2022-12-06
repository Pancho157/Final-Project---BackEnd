const { Users } = require("../../utils/Mongoose-Schemas_Models");
const md5 = require("md5");

class UserControllerMongo {
  constructor() {}

  // * -------------------------- Creación de usuario ----------------------------
  async createUser(alias, email, password) {
    // Error al existir el email o alias
    try {
      const userExists = await Users.findOne({
        $or: [{ email: email }, { alias: alias }],
      });

      if (userExists) {
        let exists = {};
        if (userExists.email == email) {
          exists.email = userExists.email;
        }
        if (userExists.alias == alias) {
          exists.alias = userExists.alias;
        }

        return exists;
      }
    } catch (err) {
      return err.message;
    }

    // Guardando el usuario
    try {
      const newUser = new Users({ alias, email, password });
      newUser.password = md5(password);
      await newUser.save();
    } catch (err) {
      return err.message;
    }

    // Devuelve el alias para guardarlo en session
    return { newUserAlias: alias };
  }

  // * -------------------------- Auth de usuario ----------------------------
  async verifyUser(userIdentifier, userPassword) {
    // userIdentifier = email || alias
    let userExists;

    try {
      userExists = await Users.findOne({
        $or: [{ email: userIdentifier }, { alias: userIdentifier }],
      });

      if (!userExists) {
        return "El usuario ingresado no existe";
      }
    } catch (err) {
      return err.message;
    }

    // Comparacion de contraseñas (email encontrado)
    if (md5(userPassword) == userExists.password) {
      return { alias: userExists.alias };
    }

    // usuario o contraseña incorrecto
    return "Contraseña incorrecta";
  }
}

module.exports = { UserControllerMongo };
