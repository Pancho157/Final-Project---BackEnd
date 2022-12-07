const { Router } = require("express");
const { getServerInfo } = require("../Controller/info");


const info = Router();

info.get("/info", getServerInfo);

module.exports = { info };
