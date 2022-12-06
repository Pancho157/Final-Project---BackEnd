const { productsDao, chatDao } = require("../DB/DAOs/DAOselector");
const { logger } = require("../loggers/log4js-config");

async function sockets(io) {
  io.on(`connection`, async (socket) => {
    logger.info("Nuevo cliente conectado");

    socket.emit("productsFromServer", await productsDao.getProducts());
    socket.emit("messagesFromServer", await chatDao.getMessages());

    socket.on("new-message", async (data) => {
      await chatDao.insertMessage(data);
      io.sockets.emit("messagesFromServer", await chatDao.getMessages());
    });

    socket.on("new-product", async (data) => {
      await productsDao.insertProduct(data);
      io.socket.emit("productsFromServer", await productsDao.getProducts());
    });
  });
}

module.exports = { sockets };
