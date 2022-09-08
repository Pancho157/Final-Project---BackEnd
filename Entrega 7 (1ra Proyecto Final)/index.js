const express = require("express");
const { Server: HttpServer } = require("http");

var app = express();
const httpServer = new HttpServer(app);
// const io = new IOServer(httpServer);

const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------- Router -----------------------
app.use("/api/productos", require("./routes/apiProductos"));
app.use("/api/carrito", require("./routes/apiCarrito"));

// ----------------------- Error 404 -----------------------
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});
