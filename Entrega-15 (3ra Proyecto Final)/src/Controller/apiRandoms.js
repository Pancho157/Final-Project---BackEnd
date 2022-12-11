const { getNumbersObject } = require("../Service/randomNumbers");
const { fork } = require("child_process");
const path = require("path");

function getRandoms(req, res) {
  const repetitions = parseInt(req.params.reps);

  // getNumbersObject(repetitions);

  const randomObject = fork(
    path.resolve(__dirname, "../Service/randomNumbers.js")
  );

  randomObject.on("message", (object) => {
    res.send(object);
  });

  randomObject.send(repetitions);
}

module.exports = { getRandoms };
