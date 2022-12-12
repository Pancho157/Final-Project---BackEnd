const md5 = require("md5");
const { usersDao } = require("../../Persistence/DAOs/DAOselector");

async function login(data) {
  const { user, password } = data;
  let userInfo;
  if (!user || !password) {
    throw {
      error: "Ingrese todos los datos requeridos (user, password)",
      errorCode: 400,
    };
  }

  try {
    userInfo = await usersDao.getUserInfo(user);
    if (!userInfo) {
      throw {
        error: "El usuario ingresado no existe",
        errorCode: 400,
      };
    }
  } catch (err) {
    throw {
      error:
        "Hubo un error al iniciar sesión, recargue la página y vuelva a intentarlo",
      errorCode: 500,
    };
  }

  if (userInfo.password == md5(password)) {
    return { alias: userInfo.alias, userId: userInfo._id };
  } else {
    throw {
      error: "Contraseña incorrecta",
      errorCode: 400,
    };
  }
}

module.exports = { login };
