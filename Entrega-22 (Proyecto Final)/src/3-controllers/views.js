function getLoginRegisterPage(req, res) {
  res.render("login_register_forms");
}

function getChatPage(req, res) {
  res.render("chat_view");
}

function getUserMessagesPage(req, res) {
  res.render("user_messages");
}

module.exports = {
  getLoginRegisterPage,
  getChatPage,
  getUserMessagesPage,
};
