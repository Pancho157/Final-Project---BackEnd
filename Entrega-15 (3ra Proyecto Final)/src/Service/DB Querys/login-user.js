const md5 = require("md5");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");
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

async function getUserInfoFromDB(user) {
  try {
    let userInfo = await usersDao.getUserInfo(user);

    if (!userInfo) {
      throw {
        error: "El usuario ingresado no existe",
        errorCode: 400,
      };
    }

    let phoneLastNumbers = String(userInfo.phoneNum).slice(-2);
    phoneLastNumbers = parseInt(phoneLastNumbers);

    const filteredUserInfo = {
      alias: userInfo.alias,
      email: userInfo.email,
      direction: userInfo.direction,
      age: userInfo.age,
      phoneNum: phoneLastNumbers,
    };

    return filteredUserInfo;
  } catch (err) {
    logger.error(err);
    throw {
      error:
        "Lo sentimos, ha ocurrido un error, recargue la pábina e intentelo de nuevo",
      errorCode: 500,
    };
  }
}

module.exports = { login, getUserInfoFromDB };
