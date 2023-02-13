const { createTransport } = require("nodemailer");
const { logger } = require("../configs/logger");

const sendNewOrderEmailToAdmin = async (purchase) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
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
                <th>Precio unitario</th>
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

// ------------------------------------------------

const sendNewUserEmailToAdmin = async (user) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const emailOptions = {
    from: `Nodemailer - ${process.env.NODEMAILER_EMAIL}`,
    to: process.env.ADMIN_EMAIL,
    subject: `Nuevo usuario registrado: ${user.email}`,
    html: `
            <h1>Nuevo usuario registrado:</h1> <br>
            <span>Tipo de usuario: ${user.rol}</span> <br>
            <span>Nombre: ${user.fullname.name}</span> <br>
            <span>Email: ${user.email}</span>
          `,
  };

  try {
    await transporter.sendMail(emailOptions);
    return { result: true };
  } catch (err) {
    logger.error("No se puedo enviar Email al administrador");
    throw {
      error: "No se puedo enviar Email al administrador",
      errorCode: 500,
    };
  }
};

module.exports = { sendNewOrderEmailToAdmin, sendNewUserEmailToAdmin };
