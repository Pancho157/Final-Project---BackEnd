const { logger } = require("../../../configs/logger");
const { UsersDao } = require("../../5-persistance/dao/daoSelector");

class UsersQueries {
  static instance;
  constructor() {
    // -!!- of "undefined" == false
    if (!!UsersQueries.instance) {
      return UsersQueries.instance;
    }
    UsersQueries.instance = this;
  }

  async getByEmail(email) {
    try {
      return await UsersDao.getByEmail(email);
    } catch (err) {
      logger.error(err);
    }
  }

  async create(data) {
    try {
      return await UsersDao.add(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async updateCart(email, data) {
    try {
      return await UsersDao.updateCart(email, data);
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { UsersQueries };
