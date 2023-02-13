const { logger } = require("../../configs/logger");
const { ChatQueries } = require("./queries_to_db/chat_queries");

const chat = new ChatQueries();

class Chat {
  static instance;

  constructor() {
    // -!!- of "undefined" = false
    if (!!Chat.instance) {
      return Chat.instance;
    }
    Chat.instance = this;
  }

  async getMessages() {
    try {
      return await chat.getMessages();
    } catch (err) {
      throw {
        error: "Se ha producido un error al traer los mensajes",
        errorCode: 500,
      };
    }
  }

  async getUserMessages(email) {
    try {
      return await chat.getUserMessages(email);
    } catch (err) {
      throw {
        error: "Se ha producido un error al traer los mensajes",
        errorCode: 500,
      };
    }
  }

  async insertMessage(data) {
    if (!data.email || !data.message || !data.rol) {
      throw {
        error:
          "Ingrese el email, el mensaje y el rol del usuario para generar el mensaje",
        errorCode: 400,
      };
    }

    try {
      return await chat.newMessage({
        author: data.email,
        message: data.message,
        rol: data.rol,
        responses: [],
        date: new Date(),
      });
    } catch (err) {
      throw {
        error: "Se ha producido un error al guardar el mensaje",
        errorCode: 500,
      };
    }
  }

  async insertResponse(messageId, data) {
    try {
      return await chat.newResponse(messageId, data);
    } catch (err) {
      logger.error(err);
      throw {
        error: "Se ha producido un error al guardar la respuesta",
        errorCode: 500,
      };
    }
  }
}

module.exports = { Chat };
