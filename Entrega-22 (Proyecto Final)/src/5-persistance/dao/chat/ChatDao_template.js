class ChatMethodsTemplate {
  insertMessage(data) {
    throw { errorCode: 500, error: "insertMessage method not implemented!" };
  }

  getMessages() {
    throw { errorCode: 500, error: "getMessages method not implemented!" };
  }
}

module.exports = { ChatMethodsTemplate };
