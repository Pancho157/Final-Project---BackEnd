const { UsersMethodsTemplate } = require("./UsersDao_template");
const { Users } = require("../../../../configs/mongoose_schemas");
const { logger } = require("../../../../configs/logger");

class UsersMongo extends UsersMethodsTemplate {
  static instance;
  constructor() {
    super();

    // -!!- of "undefined" = false
    if (!!UsersMongo.instance) {
      return UsersMongo.instance;
    }
    UsersMongo.instance = this;
    this.model = Users;
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email: email });
    } catch (err) {
      logger.error(err);
    }
  }

  async add(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async updateCart(email, data) {
    try {
      return await this.model.findOneAndUpdate(
        { email: email },
        { userCart: data },
        { new: true }
      );
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { UsersMongo };
