const fs = require('fs/promises');
const path = require('path');

(async function getFiles() {
  const pathToFolder = path.join(__dirname, './secret-folder');
  try {
    const objects = await fs.readdir(pathToFolder, { withFileTypes: true });
    for (const object of objects) {
      if (object.isFile()) {
        const file = await fs.stat(path.join(pathToFolder, object.name));
        const name = object.name.slice(0, object.name.indexOf('.'));
        const extname = path.extname(object.name).slice(1);
        const size = (file.size / 1024).toFixed(3) + 'kb';
        console.log(`${name} - ${extname} - ${size}`);
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
