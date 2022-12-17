const md5 = require("md5");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");
const { usersDao } = require("../../Persistence/DAOs/DAOselector");

async function registerUser(data) {
  const { email, alias, direction, age, phoneNum, password } = data;
  let userCart = [];
  let exists = {};

  // * En caso de no ingresaro todos los datos
  if (!email || !alias || !direction || !age || !phoneNum || !password) {
    throw {
      error: "Ingrese todos los datos requeridos",
      errorCode: 400,
    };
  }

  // * En caso de existir el usuario
  try {
    // if exists = true, else = false
    if (await usersDao.verifyAlias(alias)) exists.alias = true;

    if (await usersDao.verifyEmail(email)) exists.email = true;
  } catch (err) {
    logger.error(err);
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }

  if (exists.alias == true && exists.email == true) {
    throw {
      error: "El email y alias ingresados ya existen",
      errorCode: 400,
    };
  } else if (exists.alias == true) {
    throw {
      error: "El alias ingresado ya existe",
      errorCode: 400,
    };
  } else if (exists.email == true) {
    throw {
      error: "El email ingresado ya existe",
      errorCode: 400,
    };
  }

  // * Creación de usuario
  try {
    response = await usersDao.createUser({
      email: email,
      alias: alias,
      direction: direction,
      age: age,
      phoneNum: phoneNum,
      userCart: [],
      password: md5(password),
    });
    return alias;
  } catch (err) {
    logger.error(err);
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }
}

module.exports = { registerUser };
