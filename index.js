#!/usr/bin/env node
const watch = require("node-watch");
const cp = require("child_process");
const commander = require("commander");
const cwd = process.cwd();
commander
  .version("0.0.0")
  .option("-p, --path <path to json file>", "Path to lambda input data")
  .parse(process.argv);
if (!commander.args[0]) {
  console.log("Function name missing");
  process.exit();
}
console.log(`Watching ${cwd}`);
watch(cwd, { recursive: true }, function(event, name) {
  let args = ["invoke", "local", "--function", commander.args[0]];
  if (commander.path) args = [...args, "--path", commander.path];
  cp.spawnSync("sls", args, {
    stdio: "inherit"
  });
});
