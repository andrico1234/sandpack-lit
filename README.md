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
