class ProductsDao {
  async getAll() {
    throw { errorCode: 500, error: "getAll method not implemented!" };
  }

  async getById(id) {
    throw { errorCode: 500, error: "getById method not implemented!" };
  }

  async getByCategory(category) {
    throw { errorCode: 500, error: "getByCategory method not implemented!" };
  }

  async add(prodNuevo) {
    throw { errorCode: 500, error: "add method not implemented!" };
  }

  async updateById(id, data) {
    throw { errorCode: 500, error: "updateById method not implemented!" };
  }

  async deleteById(id) {
    throw { errorCode: 500, error: "deleteById method not implemented!" };
  }

  async deleteAll() {
    throw { errorCode: 500, error: "deleteAll method not implemented!" };
  }
}

module.exports = { ProductsDao };
