# Sandpack Lit

A lit implementation of "Sandpack React".

The aim is to build a reduced-scoped api of the official sandpack-react repo.

## Initial Release

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
