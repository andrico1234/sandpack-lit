import fs from "fs";
import prettier from 'prettier'

const dirs = fs.readdirSync('./examples', { withFileTypes: true }).filter(x => x.isDirectory()).map(({ name }) => name)

dirs.forEach((dir) => {
  const exampleDir = `./examples/${dir}/files`
  const files = fs.readdirSync(exampleDir, { withFileTypes: true }).filter(x => x.isFile()).map(({ name }) => name);
  const filesContents = files.reduce((acc, curr) => {
    const contents = fs.readFileSync(`${exampleDir}/${curr}`, 'utf-8')

    return {
      ...acc,
      [`/${curr}`]: contents
    }
  }, {})

  const index = `const examples = {
    files: ${JSON.stringify(filesContents)},
    customSetup: {
      dependencies: {
        lit: "2.6.1",
      },
    },
  };
  
  export default examples;`

  fs.writeFileSync(`./examples/${dir}/index.js`, index)
})