class ChatMethodsTemplate {
  insertMessage(data) {
    throw { errorCode: 500, error: "insertMessage method not implemented!" };
  }

  async addResponse(messageId, data) {
    throw { errorCode: 500, error: "addResponse method not implemented!" };
  }

  getMessages() {
    throw { errorCode: 500, error: "getMessages method not implemented!" };
  }
}

module.exports = { ChatMethodsTemplate };
