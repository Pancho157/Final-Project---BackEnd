const { Router } = require("express");
const numCPUs = require("os").cpus().length;

const info = Router();

info.get("/info", (req, res) => {
  const information = {
    entryArgs: process.argv.slice(2),
    platformName: process.platform,
    nodeVersion: process.version,
    memoryReserved: process.memoryUsage().rss,
    executionPath: process.argv[0],
    pid: process.pid,
    projectFolder: process.cwd(),
    processorCores: numCPUs,
  };

  // console.log(information);

  res.render("info", information);
});

module.exports = { info };
