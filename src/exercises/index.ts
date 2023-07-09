const exercises = [
  {
    "/package.json": {
      code: JSON.stringify({
        main: "index.js",
        dependencies: { lit: "latest" },
      }),
    },
    "/index.js": { code: "console.log('Hello world')" },
  },
];

export default exercises;
