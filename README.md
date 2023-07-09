# Sandpack Lit

A lit implementation of "Sandpack React".

The aim is to build a reduced-scoped api of the official sandpack-react repo.

## Initial Release

- [x] Create a custom element that renders the sandpack preview
- [x] Run a Vite project for creating and rendering a custom element
- [x] Create a context that passes the files through to the children
- [ ] Create a code editor by wrapping around CodeMirror
- [ ] Create methods to update files
- [ ] Create a file navigator that behaves similar to sandpack react
- [ ] Improve the UI so that it looks similar to Codesandbox

### Components

#### Sandpack

options:

- template: string
- files
  - code: string
  - readOnly: boolean
  - active: boolean
  - hidden: boolean
- customSetUp
  - dependencies: string
  - externalResources: string[]
- readonly: boolean
- showReadOnly; boolean
- theme
  - colors
  - syntax

#### SandpackProvider

### Issues to resolve

- Dependencies in customSetup don't work. I need to add them explicitly to the package.json
- Importing resources directly in the index.html doesn't seem to work. Instead I need to import everything from the index.js. Likely to do with "entry"
