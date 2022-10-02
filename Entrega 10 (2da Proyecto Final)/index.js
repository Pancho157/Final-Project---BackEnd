require("dotenv").config();

const express = require("express");
const { Server } = require("http");

var app = express();
const httpServer = new Server(app);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Http - Socket Server On - Port: ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------- Router -----------------------
app.use("/api/productos", require("./routes/apiProductos"));
app.use("/api/carrito", require("./routes/apiCarrito"));

// ----------------------- Error 404 -----------------------
app.use((req, res) => {
  res.status(404).send({
    error: -1,
    descripción: `ruta ${req.url} método ${req.method} no implementada`,
  });
});
