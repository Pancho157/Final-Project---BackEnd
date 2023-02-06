const session = require("express-session");
const MongoStore = require("connect-mongo");

const Session = session({
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
  }),
  secret: "top_secret_secret_key",
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: process.env.SESSION_TIME || 600000,
  },
});

module.exports = { Session };
