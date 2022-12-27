const { Router } = require("express");
const { getRandoms } = require("../Controller/api-randoms");

const apiRandoms = Router();

apiRandoms.get("/randoms/:reps", getRandoms);

module.exports = { apiRandoms };
