const autocannon = require("autocannon");
const { PassThrough } = require("stream");
const yargs = require("yargs/yargs")(process.argv.slice(2));

const { puerto, modo, _ } = yargs
  .alias({
    p: "puerto",
    m: "modo",
  })
  .default({
    p: 8080,
    m: "FORK",
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

  console.log("Autocannon benchmark is running");
}

run(`http://localhost:${puerto}/info`);
