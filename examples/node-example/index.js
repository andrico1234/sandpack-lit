const examples = {
    files: {"/index.js":"const express = require('express');\nconst { create } = require('express-handlebars');\n\nconst app = express();\nconst port = 3000;\n\nconst hbs = create({\n  helpers: {\n    isEq(val, val2) { return val === val2 },\n  }\n});\n\napp.engine('handlebars', hbs.engine)\napp.set('view engine', 'handlebars');\napp.set('views', './views');\n\napp.get('/', (req, res) => {\n  res.render('index', {\n    route: 'home'\n  });\n});\n\napp.get('/albums', (req, res) => {\n  res.render('albums', {\n    route: 'albums'\n  });\n});\n\napp.get('/top-40', (req, res) => {\n  res.render('top-40', {\n    route: 'top-40'\n  });\n});\n\napp.listen(port, () => console.log(`App listening to port ${port}`));","/views/albums.handlebars":"<header class=\"flex-row space-between bg-accent padding-h-4 padding-v-2\">\n  <h1>Albums</h1>\n</header>","/views/index.handlebars":"<header class=\"flex-row space-between bg-accent padding-h-4 padding-v-2\">\n  <h1>Album Odyssey</h1>\n</header>","/views/top-40.handlebars":"<header class=\"flex-row space-between bg-accent padding-h-4 padding-v-2\">\n  <h1>Top 40</h1>\n</header>","/views/layouts/main.handlebars":"<html lang=\"en\">\n  <head>\n    <meta charset=\"utf-8\" />\n    <title>Compiled Templating Languages Example</title>\n    <meta\n      name=\"viewport\"\n      content=\"width=device-width, initial-scale=1.0, viewport-fit=cover\"\n    />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin />\n    <link href=\"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Work+Sans:wght@400;700&display=swap\" rel=\"stylesheet\" />\n    <link rel=\"stylesheet\" href=\"/styles.css\" />\n    <style>\n      /* BASE STYLES */\n\n:root {\n  --font-family: \"Work Sans\", sans-serif;\n  --white: #fff;\n  --black: #1e1e1e;\n  --gray-1: #888888;\n  --gray-2: #dddddd;\n  --accent: #e50000;\n\n  --spacing: 8px;\n}\n\nbody {\n  margin: 0;\n  font-family: var(--font-family);\n}\n\nh1 {\n  font-size: 2rem;\n  font-weight: 400;\n}\n\np {\n  font-size: 1rem;\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n\na {\n  color: inherit;\n}\n\n/* LAYOUT UTILITIES */\n\n.flex-row {\n  display: flex;\n  flex-direction: row;\n}\n\n.space-between {\n  justify-content: space-between;\n}\n\n.padding-v-2 {\n  padding-block: calc(var(--spacing) * 2);\n}\n\n.padding-h-4 {\n  padding-inline: calc(var(--spacing) * 4);\n}\n\n.height-4 {\n  height: calc(var(--spacing) * 4);\n}\n\n.vertical-center-align {\n  display: flex;\n  align-items: center;\n}\n\n/* APPEARANCE UTILITIES */\n\n.bg-accent {\n  background-color: var(--accent);\n  color: var(--white);\n}\n\n.bg-dark {\n  background-color: var(--black);\n  color: var(--white);\n}\n\n.bg-gray-1 {\n  background-color: var(--gray-1);\n  color: var(--white);\n}\n\n.bg-gray-2 {\n  background-color: var(--gray-2);\n  color: var(--black);\n}\n\n.text-center {\n  text-align: center;\n}\n    </style>\n    \n  </head>\n  <body>\n    {{{body}}}\n    {{> nav}}\n  </body>\n</html>","/views/partials/nav.handlebars":"<nav class=\"bg-dark\">\n  <ul class=\"flex-row padding-h-4 text-center\">\n    <li class=\"{{#if (isEq 'home' route)}}bg-gray-1{{else}}bg-gray-2{{/if}} padding-v-2 padding-h-4 vertical-center-align\">\n      <a href=\"/\">\n        <p>Home</p>\n      </a>\n    </li>\n    <li class=\"{{#if (isEq 'top-40' route)}}bg-gray-1{{else}}bg-gray-2{{/if}} padding-v-2 padding-h-4 vertical-center-align\">\n      <a href=\"/top-40\">\n        <p>Top 40</p>\n      </a>\n    </li>\n    <li class=\"{{#if (isEq 'albums' route)}}bg-gray-1{{else}}bg-gray-2{{/if}} padding-v-2 padding-h-4 vertical-center-align\">\n      <a href=\"/albums\">\n        <p>Albums</p>\n      </a>\n    </li>\n  </ul>\n</nav>"},
    customSetup: {
  "dependencies": {
    "express": "4.18.2",
    "express-handlebars": "7.0.0"
  }
}

  };
  
  export default examples;