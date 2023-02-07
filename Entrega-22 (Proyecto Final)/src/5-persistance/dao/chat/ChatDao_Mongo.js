const { ChatMethodsTemplate } = require("./ChatDao_template.js");
const { Message } = require("../../../../configs/mongoose_schemas");

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
      console.log(err);
    }
  }

  async getMessages() {
    try {
      return await Message.find();
    } catch (err) {
      console.log(err);
    }
  }

  async getUserMessages(email) {
    try {
      return await Message.find({ author: email });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ChatMongo };
