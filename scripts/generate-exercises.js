import fs from "fs";

const getDirs = (path) => {
  return fs
    .readdirSync(path, { withFileTypes: true })
    .filter((x) => x.isDirectory())
    .map(({ name }) => name);
}

const baseDirs = getDirs('./examples')

const getFilesRecursive = (path, dir = '') => {
  const fullPath = dir ? `${path}/${dir}` : path;

  const directories = getDirs(fullPath);
  let nestedFiles = [];

  directories.forEach((d) => {
    const childFiles = getFilesRecursive(fullPath, d);
    nestedFiles.push(...childFiles);
  })

  const files = fs
    .readdirSync(fullPath, { withFileTypes: true })
    .filter((x) => x.isFile())
    .map(({ name }) => {
      if (!fullPath) return name

      return `${fullPath}/${name}`;
    });

  return [...files, ...nestedFiles];
}

const buildFiles = (files, dir) => {
  const filesContents = files.reduce((acc, curr) => {
    const contents = fs.readFileSync(curr, 'utf-8');

    const cleanedFileName = curr.replace(`${dir}/`, '')

    if (cleanedFileName === 'index.html') {
      return {
        [`/${cleanedFileName}`]: contents,
        ...acc,
      }
    }

    return {
      ...acc,
      [`/${cleanedFileName}`]: contents
    };
  }, {});

  return filesContents
}

const writeIndexFile = (filesContents, dir) => {

  const customSetup = fs.readFileSync(`./examples/${dir}/customSetup.json`, 'utf-8')

  const index = `const examples = {
    files: ${JSON.stringify(filesContents)},
    customSetup: ${customSetup}
  };
  
  export default examples;`

  fs.writeFileSync(`./examples/${dir}/index.js`, index)
}

baseDirs.forEach((dir) => {
  const filesDir = `./examples/${dir}/files`;
  const files = getFilesRecursive(filesDir)
  const filesContents = buildFiles(files, filesDir);

  writeIndexFile(filesContents, dir);
});


