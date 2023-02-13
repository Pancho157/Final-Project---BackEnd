const { ChatDao } = require("../../5-persistance/dao/daoSelector");

class ChatQueries {
  constructor() {}

  async getMessages() {
    try {
      return await ChatDao.getMessages();
    } catch (err) {
      throw {
        error: "Se ha producido un error al traer los mensajes",
        errorCode: 500,
      };
    }
  }

  async getUserMessages(email) {
    try {
      return await ChatDao.getUserMessages(email);
    } catch (err) {
      throw {
        error: "Se ha producido un error al traer los mensajes",
        errorCode: 500,
      };
    }
  }

  async newMessage(data) {
    try {
      return await ChatDao.insertMessage(data);
    } catch (err) {
      throw {
        error: "Se ha producido un error al guardar el mensaje",
        errorCode: 500,
      };
    }
  }

  async newResponse(messageId, data) {
    try {
      return await ChatDao.addResponse(messageId, data);
    } catch (err) {
      throw {
        error: "Se ha producido un error al guardar la respuesta al mensaje",
        errorCode: 500,
      };
    }
  }
}

module.exports = { ChatQueries };
