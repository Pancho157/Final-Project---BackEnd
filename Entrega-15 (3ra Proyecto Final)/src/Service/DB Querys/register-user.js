const md5 = require("md5");
const { usersDao } = require("../../Persistence/DAOs/DAOselector");

async function registerUser(data) {
  const { email, alias, password } = data;
  let exists = {};

  // * En caso de no ingresaro todos los datos
  if (!email || !alias || !password) {
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
    response = await usersDao.createUser(alias, email, md5(password));
    return `Usuario generado exitosamente`;
  } catch (err) {
    throw {
      error: "Se ha producido un error",
      errorCode: 500,
    };
  }
}

module.exports = { registerUser };
