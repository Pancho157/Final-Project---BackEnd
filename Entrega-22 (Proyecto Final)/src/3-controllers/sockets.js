const sharedsession = require("express-socket.io-session");
const { Session } = require("../../configs/sessions_connection");

const { chat } = require("../4-service/chat_logic");
const { products } = require("../4-service/products_logic");

async function sockets(io) {
  // Access to session variables
  io.use(
    sharedsession(Session, {
      autoSave: true,
    })
  );
  // On new client
  io.on(`connection`, async (socket) => {
    console.log("Nuevo cliente conectado");

    socket.emit("productsFromServer", await products.getAll());
    socket.emit("messagesFromServer", await chat.getMessages());

    // On new message
    socket.on("new-message", async (data) => {
      let user = socket.handshake.session.userName;
      try {
        await chat.newMessage(data.message, user);
      } catch (err) {
        console.log(err);
      }

      io.sockets.emit("messagesFromServer", await chat.getMessages());
    });

    // On new product
    socket.on("new-product", async (data) => {
      try {
        await products.create(data);
      } catch (err) {
        console.log(err);
      }

      io.socket.emit("productsFromServer", await products.getAll());
    });
  });
}

module.exports = { sockets };
