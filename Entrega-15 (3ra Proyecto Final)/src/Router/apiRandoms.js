const { Router } = require("express");
const { getRandoms } = require("../Controller/apiRandoms");

const apiRandoms = Router();

apiRandoms.get("/randoms/:reps", getRandoms);

module.exports = { apiRandoms };
