const sharedsession = require("express-socket.io-session");
const { Session } = require("./sessions");

const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { getAllProducts, insertProduct } = require("../DB Querys/products");
const {
  getChatMessages,
  newChatMessage,
} = require("../DB Querys/chatMessages");

async function sockets(io) {
  io.use(
    sharedsession(Session, {
      autoSave: true,
    })
  );
  io.on(`connection`, async (socket) => {
    logger.info("Nuevo cliente conectado");

    socket.emit("productsFromServer", await getAllProducts());
    socket.emit("messagesFromServer", await getChatMessages());

    socket.on("new-message", async (data) => {
      let userId = socket.handshake.session.userId;
      const messageData = { message: data, userId: userId };
      await newChatMessage(messageData);
      io.sockets.emit("messagesFromServer", await getChatMessages());
    });

    socket.on("new-product", async (data) => {
      await insertProduct(data);
      io.socket.emit("productsFromServer", await getAllProducts());
    });
  });
}

module.exports = { sockets };
