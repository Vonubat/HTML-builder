'use strict';

const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, './styles');
const projectDistFolder = path.join(__dirname, './project-dist');
const bundleCss = fs.createWriteStream(
  path.join(projectDistFolder, 'bundle.css')
);

async function mergeStyles(origin, dest) {
  try {
    const files = await fs.promises.readdir(origin, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const read = fs.createReadStream(path.join(origin, file.name), 'utf-8');
        read.pipe(dest);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

mergeStyles(stylesFolder, bundleCss);
