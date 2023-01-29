require("dotenv").config();

const path = require("path");

// Express - sockets - servers
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const { engine } = require("express-handlebars");

// Sockets - Sessions
const { sockets } = require("../3-controllers/sockets");
const { Session } = require("../../configs/sessions_connection");

// Routes
const { crudProducts } = require("../2-routes/products_routes");

// BBDD
const { connectToMongo } = require("../../configs/mongo_atlas_connection");

// ----------------------- Inicialización de servidor HTTP -----------------------
var app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const connectedServer = httpServer.listen(process.env.PORT || 8080, () => {
  console.log(`Http - Socket Server On - Port: ${process.env.PORT || 8080}`);
});

// En caso de fallar el servidor de sockets
connectedServer.on("error", (err) => {
  console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
//
// // -----------------------  Conección a MongoDB Atlas -----------------------
// try {
//   connectToMongo();
// } catch (err) {
//   console.log(err);
// }

// ----------------------- Handlebars -----------------------
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");
app.engine(".hbs", engine({ extname: ".hbs" }));

// ----------------------- Passport & Sessions -----------------------
app.use(Session);

// ----------------------- Sockets -----------------------
sockets(io);

// ----------------------- Routes -----------------------
app.use("/products", crudProducts);

// ----------------------- Error 404 -----------------------
app.use((req, res) => {
  res.status(404).send("No se encontró la página que estás buscando");
});
