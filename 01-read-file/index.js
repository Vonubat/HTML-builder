const fs = require('fs');
const path = require('path');

const pathToText = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToText, 'utf8');

stream.on('data', (data) => {
  console.log(data);
});
