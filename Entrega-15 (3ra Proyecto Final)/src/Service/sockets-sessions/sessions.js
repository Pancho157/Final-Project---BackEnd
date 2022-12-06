const session = require("express-session");
const MongoStore = require("connect-mongo");

// VkCAVriXGpPzWpc3

const Session = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
  }),
  secret: "mongoSecret",
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000,
  },
});

module.exports = { Session };
