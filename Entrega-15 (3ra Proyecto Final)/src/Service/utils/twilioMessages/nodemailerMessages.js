const { createTransport } = require("nodemailer");
const { logger } = require("../config/logger.config.js");

const sendBuyEmailToAdmin = async (pedido, usuario) => {
  const transporter = createTransport({
    service: "gmail",
    port: 465, // Único puerto seguro (según nodemailer)
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  body = "";
  for (let i = 0; i < pedido.length; i++) {
    body += `   
        <tr>
            <td> ${pedido[i].name} </td>
            <td> ${pedido[i].description} </td>
            <td> ${pedido[i].price} </td>
        </tr>`;
  }

  const mailOptions = {
    from: `Nodemailer - ${process.env.NODEMAILER_EMAIL}`,
    to: process.env.NODEMAILER_EMAIL,
    subject: `Nuevo pedido de: ${usuario.nombre} - ${usuario.email}`,
    html: ` 
        <table>
            <thead>
                <th>Producto</th>
                <th>Descripcion</th>
                <th>Precio</th>
            </thead>
            <tbody>${body}</tbody>
        </table>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    logger.err("No se puedo enviar Email al administrador");
  }
};

module.exports = { sendBuyEmailToAdmin };
