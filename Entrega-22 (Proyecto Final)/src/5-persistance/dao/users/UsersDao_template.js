class UsersMethodsTemplate {
  async getByEmail(email) {
    throw { errorCode: 500, error: "getById method not implemented!" };
  }

  async add(data) {
    throw { errorCode: 500, error: "add method not implemented!" };
  }

  async updateCart(email, data) {
    throw { errorCode: 500, error: "updateCart method not implemented!" };
  }
}

module.exports = { UsersMethodsTemplate };
