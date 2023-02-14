// -------------------- Sockets connection ---------------------
const socket = io.connect();

// -------------------- Render messages ---------------------
const renderMessages = (messages) => {
  const messagesHTML = messages
    .map((message) => {
      let messageHTML = `
      <div class="message">
        <span class="message__email">${
          message.rol == "admin" ? "Sistema" : message.author
        }</span>:
        <span class="message__date">[${message.date}]<span>
        <br>
        <span class="message__text">Id del mensaje: ${message._id}</span>
        <br>
        <p class="message__text">Mensaje: ${message.message}</p>
      </div>
      `;

      // Renders responses
      message.responses.forEach((response) => {
        messageHTML += `
        <div class="message__response">
          <span class="message__email">${
            response.rol == "admin" ? "Sistema" : response.email
          }</span>:
          <span class="message__date">[${response.date}]<span>
          <br>
          <p class="message__text">Mensaje: ${response.message}</p>
        </div>
      `;
      });

      return messageHTML;
    })
    .join(" ");
  document.getElementById("chat__messagesContainer").innerHTML = messagesHTML;
};

// New message from client
const addMessage = () => {
  const responseId = document.getElementById("responseTo").value;
  const message = document.getElementById("message").value;
  const userEmail = document.getElementById("user-email").innerText;
  const userRol = document.getElementById("user-rol").innerText;

  if (responseId != "") {
    socket.emit("new-response", {
      responseId: responseId,
      email: userEmail,
      message: message,
      rol: userRol,
    });
  } else {
    socket.emit("new-message", {
      message: message,
      email: userEmail,
      rol: userRol,
    });
  }
};

// Messages from server
socket.on("messagesFromServer", (messages) => {
  renderMessages(messages);
});
