const express = require("express");
const path = require("path");
const { Server: HttpServer } = require("http");
// const { Server: IOServer } = require("socket.io");

var app = express();
const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

// En caso de fallar el servidor de sockets
connectedServer.on("error", (err) => {
  console.log(err);
});

// ----------------------- Manejo con sockets -----------------------
// io.on(`connection`, async (socket) => {
//   console.log("Nuevo cliente conectado");
// });

// ----------------------- Router -----------------------
app.use("/api/productos", require("./routes/apiProductos"));
app.use("/api/carrito", require("./routes/apiCarrito"));

// ----------------------- Error 404 -----------------------
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});
