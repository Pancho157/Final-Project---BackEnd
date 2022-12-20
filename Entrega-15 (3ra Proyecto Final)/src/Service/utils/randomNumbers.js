const { logger } = require("../../../loggers-testing/loggers/log4js-config");

function getNumbersObject(quantity = 100000000) {
  let objectToReturn = {};

  for (let i = 0; i < quantity; i++) {
    const number = Math.floor(Math.random() * (1000 - 1) + 1);

    if (objectToReturn[number]) {
      objectToReturn[number]++;
    } else {
      objectToReturn[number] = 1;
    }
  }

  return objectToReturn;
}

// process.on("exit", () => {
//   logger.info(`worker #${process.pid} cerrado`);
// });

process.on("message", (reps) => {
  logger.info(`Creating object`);
  const obj = getNumbersObject(reps);
  process.send(obj);
  process.exit();
});

// module.exports = { getNumbersObject };
