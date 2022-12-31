const { createTransport } = require("nodemailer");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");

const sendNewOrderEmailToAdmin = async (cart, user) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465, // Único puerto seguro (según nodemailer)
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  messageBody = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
    messageBody += `   
        <tr>
            <td> ${cart[i].title} </td>
            <td> ${cart[i].description} </td>
            <td> ${cart[i].quantity} </td>
            <td> ${cart[i].price} </td>
        </tr>`;
  }

  messageBody += `<br><br> <h2> ------ Total: ${total} ------ </h2>`;

  const emailOptions = {
    from: `Nodemailer - ${process.env.NODEMAILER_EMAIL}`,
    to: process.env.ADMIN_EMAIL,
    subject: `Nuevo pedido de: ${user.alias} - ${user.email}`,
    html: ` 
        <table>
            <thead>
                <th>Producto</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </thead>
            <tbody>${messageBody}</tbody>
        </table>`,
  };

  try {
    await transporter.sendMail(emailOptions);
    return { result: true };
  } catch (err) {
    logger.error("No se puedo enviar Email al administrador");
    throw { error: err.message, errorCode: err.status };
  }
};

module.exports = { sendNewOrderEmailToAdmin };
