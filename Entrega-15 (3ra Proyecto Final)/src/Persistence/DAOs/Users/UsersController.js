const { Users } = require("../../utils/Mongoose-Schemas_Models");

class UserControllerMongo {
  constructor() {}

  // * -------------------------- Creación de usuario ----------------------------
  async createUser(email, alias, direction, age, phoneNum, password) {
    // Guardando el usuario
    try {
      const newUser = new Users({
        email,
        alias,
        direction,
        age,
        phoneNum,
        password,
      });
      await newUser.save();
    } catch (err) {
      logger.error(`Users Error: ${err}`);
    }

    // Devuelve el alias para guardarlo en session
    return alias;
  }

  // * -------------------------- Actualizar usuario ----------------------------

  async updateCart(alias, cart) {
    try {
      let doc = await Users.findOneAndUpdate(
        { alias: alias },
        { userCart: cart },
        { returnOriginal: false } // Así devuelve el documento modificado
      );

      return doc.userCart;
    } catch (err) {
      logger.error(`Users Error: ${err}`);
    }
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
