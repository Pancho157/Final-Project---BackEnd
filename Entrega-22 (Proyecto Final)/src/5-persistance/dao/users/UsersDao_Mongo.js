const { UsersMethodsTemplate } = require("./UsersDao_template");
const { Users } = require("../../../../configs/mongoose_schemas");

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
      console.log(err);
    }
  }

  async add(data) {
    try {
      return await this.model.create(data);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { UsersMongo };
