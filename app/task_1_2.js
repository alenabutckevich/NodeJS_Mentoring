#!/usr/bin/env node
var fs = require("fs");
var csv = require("csvtojson");

var filePath = __dirname + "\\csv\\node_mentoring_t1_2_input_example";
var csvFilePath = filePath + ".csv";
var txtFilePath =  filePath + ".txt";

var stream = fs.createReadStream(csvFilePath);

var input = "";

csv().fromStream(stream)
.on("data", function(data) {
  input += data;
})
.on("error", function(err) {
  if (err) {
    console.log(err);
  }
})
.on("done", function() {
  fs.writeFile(txtFilePath, input, function(err) {
    if (err) {
      console.log(err);
    }
  })
});

var pipeFilePath = filePath + "_pipe.txt";

var readableStream = fs.createReadStream(csvFilePath, "utf8");
var writeableStream = fs.createWriteStream(pipeFilePath);

readableStream.pipe(csv()).pipe(writeableStream).on("error", function(err) {
  console.log(err);
});
