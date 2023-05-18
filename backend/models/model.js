const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");

function read(filename) {
  const data = readFileSync(resolve("database", filename + ".json"), "utf-8");
  return JSON.parse(data);
}

function write(filename, data) {
  writeFileSync(
    resolve("database", filename + ".json"),
    JSON.stringify(data, null, 4)
  );
  return true;
}

module.exports = {
  write,
  read,
};
