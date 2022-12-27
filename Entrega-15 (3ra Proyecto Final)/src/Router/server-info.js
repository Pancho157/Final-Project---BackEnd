const { Router } = require("express");
const { getServerInfo } = require("../Controller/server-info");


const info = Router();

info.get("/info", getServerInfo);

module.exports = { info };
