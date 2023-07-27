# Sandpack Lit

A lit implementation of "Sandpack React".

The aim is to build a reduced-scoped api of the official sandpack-react repo.

This is missing a lot of features, and so if you'd like to add more features. Please feel free to open up a PR. I'll be adding features as and when I need them for my personal project.

## Getting started

Install the package

- `npm i sandpack-lit`

### Vanilla JS

Set up your HTML file:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- 1. Import the components that you plan to use -->
    <script type="module" src="/src/presets/sandpack.ts"></script>

    <!-- 2. Import a custom theme -->
    <link rel="stylesheet" href="/src/themes/odyssey.css" />
  </head>
  <body>
    <!-- 3. Use the component in your markup -->
    <sandpack-preset></sandpack-preset>

    <script type="module">
      import project from "/project";

      // 4. Access the element and pass your options through to the `sandpack.options` property
      const sandpack = document.querySelector("sandpack-preset");

      sandpack.options = {
        files: project.files,
        customSetup: project.customSetup,
      };
    </script>
  </body>
</html>
```

### Lit

## Components

### `<sandpack-preset>`

options:

- template: node | vite
- files
  - code: string
- customSetup
  - dependencies: string
  - externalResources: string[]
- initMode: "lazy" | "immediate"
- closableTabs: boolean

## Notes

- Only Vite and Node are suported