const fs = require('fs');
const path = require('path');

const projectDistFolder = path.join(__dirname, './project-dist');
const assetsFolder = path.join(__dirname, './assets');
const stylesFolder = path.join(__dirname, './styles');
const componentsFolder = path.join(__dirname, './components');

async function clearDir(dir) {
  try {
    await fs.promises.rm(dir, { recursive: true, force: true });
  } catch (error) {
    console.error(error);
  }
}

async function copyDir(origin, dest, folderName = null) {
  try {
    folderName !== null ? (dest = path.join(dest, `${folderName}`)) : 42;
    await fs.promises.mkdir(dest, { recursive: true });
    const files = await fs.promises.readdir(origin, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        await fs.promises.copyFile(
          path.join(origin, file.name),
          path.join(dest, file.name)
        );
      } else {
        copyDir(path.join(origin, file.name), path.join(dest, file.name));
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function mergeStyles(origin, dest, fileName = 'style.css') {
  try {
    const style = fs.createWriteStream(path.join(dest, fileName));
    const files = await fs.promises.readdir(origin, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const read = fs.createReadStream(path.join(origin, file.name), 'utf-8');
        read.pipe(style);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function mergeHtml(
  origin, // location of template
  components, // location of componets
  dest, // destination (result)
  templateName = 'template.html',
  htmlName = 'index.html'
) {
  try {
    let result = await fs.promises.readFile(
      path.join(origin, templateName),
      'utf8'
    );

    const files = await fs.promises.readdir(components, {
      withFileTypes: true,
    });

    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.html') {
        const name = file.name.slice(0, file.name.indexOf('.'));
        const data = await fs.promises.readFile(
          path.join(components, file.name),
          'utf8'
        );
        const pattern = new RegExp(`{{${name}}}`, 'g');
        result = result.replace(pattern, data);
      }
    }
    await fs.promises.writeFile(path.join(dest, htmlName), result, 'utf8');
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  await clearDir(projectDistFolder);
  await copyDir(assetsFolder, projectDistFolder, 'assets');
  await mergeStyles(stylesFolder, projectDistFolder);
  await mergeHtml(__dirname, componentsFolder, projectDistFolder);
  console.log('Done');
})();
