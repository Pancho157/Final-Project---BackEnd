// Funciones necesarias para los mensajes:

// insertMessage(data)
// getMessages()

const mongoose = require("mongoose");
const { Message } = require("../../utils/Mongoose-Schemas_Models");
const { logger } = require("../../../loggers/log4js-config");

class ChatControllerMongo {
  constructor() {}

  async insertMessage(data) {
    try {
      await Message.create({ data });
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
