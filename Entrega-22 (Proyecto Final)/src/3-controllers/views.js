function getLoginRegisterPage(req, res) {
  res.render("login_register_forms");
}

function getProductsPage(req, res) {
  res.render("products_list");
}

function getChatPage(req, res) {
  res.render("chat_view");
}

function getUserMessagesPage(req, res) {
  res.render("user_messages");
}

module.exports = {
  getLoginRegisterPage,
  getProductsPage,
  getChatPage,
  getUserMessagesPage,
};
