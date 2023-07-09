import fs from "fs";
import prettier from 'prettier'

const dirs = fs.readdirSync('./src/exercises', { withFileTypes: true }).filter(x => x.isDirectory()).map(({ name }) => name)

dirs.forEach((dir) => {
  const exerciseDir = `./src/exercises/${dir}/files`
  const files = fs.readdirSync(exerciseDir, { withFileTypes: true }).filter(x => x.isFile()).map(({ name }) => name);
  const filesContents = files.reduce((acc, curr) => {
    const contents = fs.readFileSync(`${exerciseDir}/${curr}`, 'utf-8')

    return {
      ...acc,
      [`/${curr}`]: contents
    }
  }, {})

  const index = `const exercise = {
    files: ${JSON.stringify(filesContents)},
    customSetup: {
      dependencies: {
        lit: "2.6.1",
      },
    },
  };
  
  export default exercise;`

  fs.writeFileSync(`./src/exercises/${dir}/index.js`, index)
})