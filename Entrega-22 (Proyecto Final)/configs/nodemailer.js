const { createTransport } = require("nodemailer");
const { logger } = require("../../../loggers-testing/loggers/log4js-config");

const sendNewOrderEmailToAdmin = async (purchase) => {
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

  for (let i = 0; i < purchase.cart.length; i++) {
    messageBody += `   
        <tr>
            <td> ${purchase.cart[i].title} </td>
            <td> ${purchase.cart[i].description} </td>
            <td> ${purchase.cart[i].quantity} </td>
            <td> ${purchase.cart[i].price} </td>
            <td> ${purchase.cart[i].unitaryPrice} </td>
        </tr>`;
  }
  messageBody += `<br><br> <h2> ------ Total: ${purchase.total} ------ </h2>`;

  const emailOptions = {
    from: `Nodemailer - ${process.env.NODEMAILER_EMAIL}`,
    to: process.env.ADMIN_EMAIL,
    subject: `Nuevo pedido de: ${purchase.email}`,
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
