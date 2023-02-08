class CartsMethodsTemplate {
  newCart() {
    throw { errorCode: 500, error: "newCart method not implemented!" };
  }

  getCart(id) {
    throw { errorCode: 500, error: "getCart method not implemented!" };
  }

  updateCart(id, data) {
    throw { errorCode: 500, error: "updateCart method not implemented!" };
  }

  emptyCart(id) {
    throw { errorCode: 500, error: "emptyCart method not implemented!" };
  }
}

module.exports = { CartsMethodsTemplate };
