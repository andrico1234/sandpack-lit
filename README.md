# Sandpack Lit

> Run entire web applications within you own web apps, regardless of which framework you’re using

This is heavily inspired by the official [React Sandpack wrapper](https://github.com/codesandbox/sandpack/tree/main/sandpack-react).

## Note

Sandpack Lit is new and isn't near feature parity with the officially supported packages. If you'd like to see more features, then please create an issue in GitHub, or open a PR

If you'd like to learn more, please check out the [announcement article](https://component-odyssey.com/articles/00-sandpack-lit-universal).

---
## Sponsor
Learn to build a component library using minimal tech with [Component Odyssey](https://component-odyssey.com/). As a result, you'll:

- Become a more future-proof web developer
- Build components that your users will love
- Boost your career opportunities
- Learn to do more with less
---

## Quickstart

The easiest way to use Sandpack Lit is through the `sandpack-preset` component. This component composes a handful of lower-level components under-the-hood that renders an editor, a preview, and context to manage state.

Begin by installing Sandpack Lit:

```bash
npm i sandpack-lit
```

Depending on your framework of choice, you'll consume the `sandpack-preset` component in slightly different ways.

### Vanilla JS (no framework)

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

### Svelte

```html
<script>
  import "sandpack-lit/dist/presets/sandpack";
  import "sandpack-lit/dist/themes/odyssey.css";

  const files = {} /** files go here */
  const dependencies = {} /** dependencies go here */
</script>

<main>
  <h1>Svelte</h1>
  <div class="container">
    <sandpack-preset
      options={{
        closableTabs: false,
        files: options.files,
        customSetup: {
          dependencies
        }
      }}
    />
  </div>
</main>

<style>
  .container {
    width: 900px;
  }
</style>
```

### Vue

```html
<script setup>
  import "sandpack-lit/dist/presets/sandpack";
  import "sandpack-lit/dist/themes/odyssey.css";

  const files = {}; /** files go here */
  const dependencies = {}; /** dependencies go here */

  const options = {
    closableTabs: false,
    files,
    customSetup: {
      dependencies,
    },
  };
</script>

<template>
  <h1>Vue</h1>
  <div style="width: 900px">
    <sandpack-preset v-bind:options="options" />
  </div>
</template>
```

### React

```javascript
import { SandpackLitComponent } from "sandpack-lit/dist/presets/sandpack-react";
import "sandpack-lit/dist/themes/odyssey.css";

function App() {
  return (
    <div style={{ width: "900px" }}>
      <h1 style={{ textAlign: "center" }}>React</h1>
      <SandpackLitComponent
        options={{
          closableTabs: false,
          files: {
            /** files go here */
          },
          customSetup: {
            dependencies: {
              lit: "2.6.1",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
```

## Components

### `<sandpack-preset>`

This component is a wrapper around the lower-level components that make up Sandpack Lit. It's the easiest way to get started with Sandpack Lit.

It sets up a preview and editor, and manages state for you.

#### Usage

```html
<!-- import -->
<script>
  import "sandpack-lit/dist/presets/sandpack";
</script>

<!-- usage -->
<sandpack-preset options="{options}"></sandpack-preset>
```

#### Props

options:

- template: 'node' | 'vite'
- files
  - [key: string]: string
- customSetup
  - dependencies: string
  - externalResources: string[]
- initMode: "lazy" | "immediate"
- closableTabs: boolean

### `<SandpackPresetComponent>`

As web components do not work out of the box with React, you can use the `SandpackPresetComponent` instead to render `sandpack-preset`.

#### Usage

```jsx
// import
import { SandpackPresetComponent } from "sandpack-lit/dist/presets/sandpack-react";

// usage
<SandpackPresetComponent options={options} />;
```

The props are the same as the `<sandpack-preset>` component.

### `<sandpack-editor>`

This component is a wrapper around the [Codemirror](https://codemirror.net/). It sets up the editor with some basic syntax highlighting.

#### Props

- closableTabs: boolean

### `<sandpack-preview>`

This component compiles the current code in the editor and renders it in an iframe using [Sandpack Client](https://github.com/codesandbox/sandpack/tree/main/sandpack-client)

#### Props

- template: 'vite' | 'node'
- initMode = 'lazy' | 'immediate'

## Theming

Sandpack Lit ships with a default theme, odyssey.css. You can also create your create your own. To do so, all you need to do is override the CSS variables with your own.

You can look at [odyssey.css](./src/themes/odyssey.css) for a list of available CSS variables you can override.

## Examples

Have a look at the [frameworks](./frameworks/) directory for examples of how to use Sandpack Lit with your framework of choice.
