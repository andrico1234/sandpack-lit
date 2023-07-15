# Sandpack Lit

A lit implementation of "Sandpack React".

The aim is to build a reduced-scoped api of the official sandpack-react repo.

## Initial Release

- [x] Create a custom element that renders the sandpack preview
- [x] Run a Vite project for creating and rendering a custom element
- [x] Create a context that passes the files through to the children
- [x] Create a code editor by wrapping around CodeMirror
- [x] Create methods to update files
- [x] Create a file navigator that behaves similar to sandpack react
- [x] Improve the UI so that it looks similar to Codesandbox

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
