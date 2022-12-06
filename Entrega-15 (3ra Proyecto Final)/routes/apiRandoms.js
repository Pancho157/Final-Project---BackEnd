const { Router } = require("express");
const { getNumbersObject } = require("../child-process/randomNumbers");
// const { fork } = require("child_process");
// const path = require("path");

const apiRandoms = Router();

apiRandoms.get("/randoms:reps?", (req, res) => {
  const repetitions = parseInt(req.query.reps);

  getNumbersObject(repetitions);

  // const randomObject = fork(
  //   path.resolve(__dirname, "../child-process/randomNumbers.js")
  // );

  // randomObject.on("message", (object) => {
  //   res.send(object);
  // });

  // randomObject.send(repetitions);
});

module.exports = { apiRandoms };
