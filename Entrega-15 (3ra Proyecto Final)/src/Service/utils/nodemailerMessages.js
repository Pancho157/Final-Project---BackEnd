const { createTransport } = require("nodemailer");
const { logger } = require("../config/logger.config.js");

const sendBuyEmailToAdmin = async (cart, user) => {
  const transporter = createTransport({
    service: "gmail",
    port: 465, // Único puerto seguro (según nodemailer)
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  messageBody = "";

  for (let i = 0; i < cart.length; i++) {
    messageBody += `   
        <tr>
            <td> ${cart[i].title} </td>
            <td> ${cart[i].description} </td>
            <td> ${cart[i].quantity} </td>
            <td> ${cart[i].price} </td>
        </tr>`;
  }

  const emailOptions = {
    from: `Nodemailer - ${process.env.NODEMAILER_EMAIL}`,
    to: process.env.ADMIN_EMAIL,
    subject: `Nuevo pedido de: ${user.nombre} - ${user.email}`,
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
  } catch (err) {
    logger.error("No se puedo enviar Email al administrador");
  }
};

module.exports = { sendBuyEmailToAdmin };
