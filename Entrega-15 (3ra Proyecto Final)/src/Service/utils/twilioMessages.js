const twilio = require("twilio");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendNewOrderMessageToAdmin = async (order, user) => {
  let total = 0;
  let message = `Nuevo pedido de: ${user.alias} - ${user.email}\nPedido:`;

  for (let i = 0; i < order.length; i++) {
    message += `\n-Producto: ${order[i].name}\n-Descripcion: ${order[i].description}\n-Precio: ${order[i].price}\n-Cantidad: ${order[i].quantity}\n ------ \n`;
    total += order[i].price * order[i].quantity;
  }

  message += `\n------ Total: ${total} ------`;

  const body = message;
  const from = `whatsapp:${process.env.TWILIO_NUMBER}`;
  const to = `whatsapp:${process.env.ADMIN_PHONE}`;

  try {
    await client.messages.create({ to, from, body });
    return { result: true };
  } catch (err) {
    logger.error("No se puedo enviar el mensaje al administrador");
    throw { error: err.message, errorCode: err.status };
  }
};

const sendOrderConfirmationMessageToUser = async (user) => {
  const from = `whatsapp:${process.env.TWILIO_NUMBER}`;
  const to = `whatsapp:${user.prefix}${user.phoneNum}`;
  const body = `${user.alias}, tu pedido esta siendo procesado. Te mantendremos informado sobre su estado. \n\nGracias por tu compra!!`;

  try {
    await client.messages.create({ from, body, to });
  } catch (err) {
    logger.error("Error al enviar el mensaje al cliente");
    throw { error: err.message, errorCode: err.status };
  }
};

module.exports = {
  sendNewOrderMessageToAdmin,
  sendOrderConfirmationMessageToUser,
};
