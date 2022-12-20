const twilio = require("twilio");
const { logger } = require("../config/logger.config.js");

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendMessageToAdmin = async (order, user) => {
  mensaje = `Nuevo pedido de: ${user.alias} - ${user.email}\nPedido:`;
  for (let i = 0; i < order.length; i++) {
    message += `\n-Producto: ${order[i].name}\n-Descripcion: ${order[i].description}\n-Precio: ${order[i].price}\n ------ \n`;
  }
  const body = message;
  const from = `whatsapp:${process.env.TWILIO_NUMBER}`;
  const to = `whatsapp:${process.env.ADMIN_PHONE}`;

  try {
    await client.messages.create({ body, from, to });
  } catch (error) {
    logger.error("No se puedo enviar Wsp al administrador");
  }
};

const sendMessageToUser = async (user) => {
  const from = `whatsapp:${process.env.TWILIO_NUMBER}`;
  const to = `whatsapp:${user.prefix}${user.phoneNum}`;
  const body = `${user.alias}, tu pedido esta siendo procesado. Te mantendremos informado sobre su estado. \n\nGracias por tu compra!!`;

  try {
    await client.messages.create({ body, from, to });
  } catch (err) {
    logger.error("Error al enviar el mensaje al cliente");
  }
};

module.exports = { sendMessageToAdmin, sendMessageToUser };
