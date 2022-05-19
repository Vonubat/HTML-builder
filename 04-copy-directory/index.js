const fs = require('fs/promises');
const path = require('path');

const pathFiles = path.join(__dirname, './files');
const pathFilesCopy = path.join(__dirname, './files-copy');

async function copyDir(origin, dest) {
  try {
    await fs.rm(dest, { recursive: true, force: true });
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(origin, { withFileTypes: true });
    for (const file of files) {
      await fs.copyFile(
        path.join(origin, file.name),
        path.join(dest, file.name)
      );
    }
  } catch (error) {
    console.error(error);
  }
}

copyDir(pathFiles, pathFilesCopy);
