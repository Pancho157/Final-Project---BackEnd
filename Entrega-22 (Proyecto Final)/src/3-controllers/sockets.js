const { logger } = require("../../configs/logger");

const { Chat } = require("../4-service/chat_logic");
const chat = new Chat();

async function sockets(io) {
  // On new client
  io.on(`connection`, async (socket) => {
    logger.info("Nuevo cliente conectado");

    socket.emit("messagesFromServer", await chat.getMessages());

    // On new message
    socket.on("new-message", async (data) => {
      try {
        await chat.insertMessage({
          email: data.email,
          message: data.message,
          rol: data.rol,
        });
      } catch (err) {
        logger.error(err);
      }

      io.sockets.emit("messagesFromServer", await chat.getMessages());
    });

    // On new response
    socket.on("new-response", async (data) => {
      try {
        await chat.insertResponse(data.responseId, {
          email: data.email,
          message: data.message,
          rol: data.rol,
          date: new Date(),
        });
      } catch (err) {
        logger.error(err);
      }

      io.sockets.emit("messagesFromServer", await chat.getMessages());
    });
  });
}

module.exports = { sockets };
