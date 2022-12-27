const { chatDao, usersDao } = require("../../Persistence/DAOs/DAOselector");

async function getChatMessages() {
  try {
    const messages = await chatDao.getMessages();
    return messages;
  } catch (err) {
    throw {
      error: "El producto ingresado ya existe",
      errorCode: 400,
    };
  }
}

async function newChatMessage(message, user) {
  let author;

  if (!message || !user) {
    throw {
      error: "Ingrese todos los datos requeridos (mensaje / usuario)",
      errorCode: 400,
    };
  }

  const messageinfo = {
    message: message,
    author: user,
    date: new Date(),
  };

  try {
    await chatDao.insertMessage(messageinfo);
    return true;
  } catch (err) {
    throw {
      error: "Hubo un error, recargue la página e intentelo nuevamente",
      errorCode: 500,
    };
  }
}

module.exports = { getChatMessages, newChatMessage };
