// Funciones necesarias para los mensajes:

// insertMessage(data)
// getMessages()

const { db } = require("../../utils/firebaseConnection");
const { logger } = require("../../../../loggers-testing/loggers/log4js-config");

class ChatControllerFirebase {
  constructor() {
    this.coleccion = db.collection("Messages");
  }

  async insertMessage(data) {
    let allMessages;
    let newId;

    // -------- Genera el id del nuevo mensaje -------
    try {
      allMessages = await this.coleccion.get();
      newId = allMessages.size + 1;
    } catch (err) {
      logger.error(`Error: ${err}`);
    }

    // -------- Guarda el mensaje -------
    try {
      await this.coleccion.doc(`${newId}`).set(data);
      return `${newId}`;
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }

  async getMessages() {
    try {
      const query = await this.coleccion.get();
      const messages = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      }));

      return messages;
    } catch (err) {
      logger.error(`Error: ${err}`);
    }
  }
}

module.exports = { ChatControllerFirebase };
