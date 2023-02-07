// -------------------- Sockets connection ---------------------
const socket = io.connect();

// -------------------- Render messages ---------------------
const renderMessages = (messages) => {
  const messagesHTML = messages
    .map((message) => {
      return `
        <div>
          <span class="message__email">${
            message.rol == "admin" ? "Sistema" : message.author
          }</span>:
          <span class="message__date">[${message.date}]<span>
          <br>
          <p class="message__text">${message.message}</p>
        </div>
        `;
    })
    .join(" ");
  document.getElementById("chat__messagesContainer").innerHTML = messagesHTML;
};

// New message from client
const addMessage = () => {
  socket.emit("new-message", {
    message: document.getElementById("message").value,
  });
};

// Messages from server
socket.on("messagesFromServer", (messages) => {
  renderMessages(messages);
});
