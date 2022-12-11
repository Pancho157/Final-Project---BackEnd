const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { getAllProducts, insertProduct } = require("../DB Querys/products");
const {
  getChatMessages,
  newChatMessage,
} = require("../DB Querys/chatMessages");

async function sockets(io) {
  io.on(`connection`, async (socket) => {
    logger.info("Nuevo cliente conectado");

    socket.emit("productsFromServer", await getAllProducts());
    socket.emit("messagesFromServer", await getChatMessages());

    socket.on("new-message", async (data) => {
      await newChatMessage(data);
      io.sockets.emit("messagesFromServer", await getChatMessages());
    });

    socket.on("new-product", async (data) => {
      await insertProduct(data);
      io.socket.emit("productsFromServer", await getAllProducts());
    });
  });
}

module.exports = { sockets };
