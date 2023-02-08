class PurchaseMethodsTemplate {
  addPurchase() {
    throw { errorCode: 500, error: "newCart method not implemented!" };
  }

  changeStatus(id) {
    throw { errorCode: 500, error: "getCart method not implemented!" };
  }
}

module.exports = { PurchaseMethodsTemplate };
