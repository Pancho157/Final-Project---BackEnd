// Funciones necesarias para los mensajes:

// insertMessage(data)
// getMessages()

const { logger } = require("../../../../loggers-testing/loggers/log4js-config");
const { Message } = require("../../utils/Mongoose-Schemas_Models");

class ChatControllerMongo {
  constructor() {}

  async insertMessage(data) {
    try {
      await Message.create(data);
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }

  async getMessages() {
    try {
      const allMessages = await Message.find();
      return allMessages;
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }
}

module.exports = { ChatControllerMongo };
