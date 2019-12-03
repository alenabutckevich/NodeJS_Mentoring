#!/usr/bin/env node
import readline from "readline";
import fs, { promises as fsPromises } from "fs";
import csv from "csvtojson";

async function processLineByLine() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let input = [];

  try {
    for await (const line of rl) {
      input.push(line);
    }

    input.forEach(line => {
      rl.write([...line].reverse().join("") + "\n");
    })
  } catch(err) {
    console.log(err);
  }
}

processLineByLine();

const csvFilePath = `${__dirname}\\csv\\node_mentoring_t1_2_input_example.csv`;

async function writeCsvToJson() {
  const txtFilePath = `${__dirname}\\csv\\node_mentoring_t1_3_input_example.txt`;

  const stream = fs.createReadStream(csvFilePath);

  try {
    const data = await csv().fromStream(stream);
    const stringData = JSON.stringify(data).replace(/]|[[]/g, "").replace(/},/g, "}\n");
    await fsPromises.writeFile(txtFilePath, stringData);
  } catch(err) {
    console.log(err);
  }
}

writeCsvToJson();

async function writeCsvToJsonWithPipe() {
  const pipeFilePath = `${__dirname}\\csv\\node_mentoring_t1_3_input_example_pipe.txt`;
  const readableStream = fs.createReadStream(csvFilePath, "utf8");
  const writeableStream = fs.createWriteStream(pipeFilePath);

  try {
    await readableStream.pipe(csv()).pipe(writeableStream);
  } catch(err) {
    console.log(err);
  }
}

writeCsvToJsonWithPipe();
