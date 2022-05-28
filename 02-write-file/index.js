'use strict';

const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');

const pathToText = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(pathToText, 'utf8');
const rl = readline.createInterface({ input, output });

rl.write('To exit, press Ctrl+C or type exit \n');
rl.write('---------------------------------- \n');
rl.write('Hello, Student 1! Type you text here: \n');

rl.on('line', (input) => {
  if (input.trim() === 'exit') {
    exit();
  } else {
    stream.write(input + '\n');
  }
});

rl.on('SIGINT', () => {
  exit();
});

function exit() {
  rl.write('Goodbye, friend of mine!');
  rl.close();
}
