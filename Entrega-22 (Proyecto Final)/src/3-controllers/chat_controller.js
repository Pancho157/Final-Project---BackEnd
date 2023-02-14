const { Chat } = require("../4-service/chat_logic");
const chat = new Chat();

function getChatPage(req, res) {
  res.render("chat_view", { email: req.user.email, rol: req.user.rol });
}

async function getUserMessagesPage(req, res) {
  const userMessages = await chat.getUserMessages(req.params.email);
  res.render("user_messages", { messages: userMessages });
}

module.exports = { getChatPage, getUserMessagesPage };
