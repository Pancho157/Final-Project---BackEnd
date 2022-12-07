const { logger } = require("../../../loggers-testing/loggers/log4js-config");

function loggerInfo(req, res, next) {
  logger.info(`Request - Route: "${req.url}", Method: "${req.method}"`);
  next();
}

module.exports = { loggerInfo };
