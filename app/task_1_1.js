#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var input = [];

rl.on("line", function(chunk) {
  input.push(chunk);
});

rl.on("close", function() {
  input.forEach(function(line) {
    rl.write(line.split("").reverse().join("") + "\n");
  });
});
