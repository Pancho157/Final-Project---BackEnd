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

async function newChatMessage(data) {
  const { message, user } = data;
  let author;

  if (!message || !user) {
    throw {
      error: "Ingrese todos los datos requeridos (mensaje / usuario)",
      errorCode: 400,
    };
  }

  try {
    author = await usersDao.getUserInfo(user);
  } catch (err) {
    throw {
      error: "Hubo un error, recargue la página e intentelo nuevamente",
      errorCode: 500,
    };
  }

  if (!author) {
    throw {
      error: "Usuario no encontrado",
      errorCode: 400,
    };
  }

  const messageinfo = {
    message: message,
    author: author._id,
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
