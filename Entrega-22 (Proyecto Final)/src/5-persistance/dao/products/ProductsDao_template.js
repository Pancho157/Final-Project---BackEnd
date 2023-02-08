class ProductsMethodsTemplate {
  getAll() {
    throw { errorCode: 500, error: "getAll method not implemented!" };
  }

  getById(id) {
    throw { errorCode: 500, error: "getById method not implemented!" };
  }

  getByCategory(category) {
    throw { errorCode: 500, error: "getByCategory method not implemented!" };
  }

  add(prodNuevo) {
    throw { errorCode: 500, error: "add method not implemented!" };
  }

  updateById(id, data) {
    throw { errorCode: 500, error: "updateById method not implemented!" };
  }

  deleteById(id) {
    throw { errorCode: 500, error: "deleteById method not implemented!" };
  }

  deleteAll() {
    throw { errorCode: 500, error: "deleteAll method not implemented!" };
  }
}

module.exports = { ProductsMethodsTemplate };
