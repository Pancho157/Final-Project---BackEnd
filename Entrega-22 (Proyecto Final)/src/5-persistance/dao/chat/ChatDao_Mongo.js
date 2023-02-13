const { ChatMethodsTemplate } = require("./ChatDao_template.js");
const { Message } = require("../../../../configs/mongoose_schemas");
const { logger } = require("../../../../configs/logger.js");

class ChatMongo extends ChatMethodsTemplate {
  static instance;

  constructor() {
    super();

    // -!!- of "undefined" = false
    if (!!ChatMongo.instance) {
      return ChatMongo.instance;
    }

    ChatMongo.instance = this;
  }

  async insertMessage(data) {
    try {
      return await Message.create(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async addResponse(messageId, data) {
    try {
      return await Message.findOneAndUpdate(
        { _id: messageId },
        { $push: { responses: data } }
      );
    } catch (err) {
      logger.error(err);
    }
  }

  async getMessages() {
    try {
      return await Message.find();
    } catch (err) {
      logger.error(err);
    }
  }

  async getUserMessages(email) {
    try {
      return await Message.find({ author: email });
    } catch (err) {
      logger.error(err);
    }
  }
}

module.exports = { ChatMongo };
