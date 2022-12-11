const { Users } = require("../../utils/Mongoose-Schemas_Models");

class UserControllerMongo {
  constructor() {}

  // * -------------------------- Creación de usuario ----------------------------
  async createUser(alias, email, password) {
    // Guardando el usuario
    try {
      const newUser = new Users({ alias, email, password });
      await newUser.save();
    } catch (err) {
      logger.error(`Users Error: ${err}`);
    }

    // Devuelve el alias para guardarlo en session
    return { newUserAlias: alias };
  }

  // * -------------------------- Obtener información ----------------------------

  async verifyAlias(alias) {
    try {
      const aliasExists = await Users.findOne({ alias: alias });
      return aliasExists ? true : false;
    } catch (err) {
      logger.error(`Users Error: ${err}`);
    }
  }

  async verifyEmail(email) {
    try {
      const emailExists = await Users.findOne({ email: email });
      return emailExists ? true : false;
    } catch (err) {
      logger.error(`Users Error: ${err}`);
    }
  }

  async getUserInfo(user) {
    try {
      let userToFind = await Users.findOne({
        $or: [{ email: user }, { alias: user }],
      });
      return userToFind;
    } catch (err) {
      logger.error(`Users Error: ${err}`);
    }
  }
}

module.exports = { UserControllerMongo };
