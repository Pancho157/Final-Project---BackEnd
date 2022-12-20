const autocannon = require("autocannon");
const { PassThrough } = require("stream");
const yargs = require("yargs/yargs")(process.argv.slice(2));

const { port, _ } = yargs
  .alias({
    p: "port",
  })
  .default({
    p: 8080,
  }).argv;

function run(url) {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 100,
    duration: 20,
  });

  autocannon.track(inst, { outputStream });

  outputStream.on("data", (data) => buf.push(data));

  inst.on("done", function () {
    process.stdout.write(Buffer.concat(buf));
  });

  logger.info("Autocannon benchmark is running");
}

run(`http://localhost:${port}/info`);
