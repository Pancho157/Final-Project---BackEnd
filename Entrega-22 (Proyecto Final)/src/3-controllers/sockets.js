const sharedsession = require("express-socket.io-session");
const { Session } = require("../../configs/sessions_connection");

const { Chat } = require("../4-service/chat_logic");
const chat = new Chat();

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

    socket.emit("messagesFromServer", await chat.getMessages());

    // On new message
    socket.on("new-message", async (data) => {
      try {
        await chat.insertMessage({
          email: socket.handshake.session.userName,
          message: data.message,
          rol: socket.handshake.session.rol,
        });
      } catch (err) {
        console.log(err);
      }

      io.sockets.emit("messagesFromServer", await chat.getMessages());
    });
  });
}

module.exports = { sockets };
