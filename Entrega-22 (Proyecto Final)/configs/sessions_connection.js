const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectionURL =
  process.env.ENV == "prod"
    ? process.env.MONGO_ATLAS_URL
    : process.env.MONGO_LOCAL_URL;

const Session = session({
  store: MongoStore.create({
    mongoUrl: connectionURL,
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
