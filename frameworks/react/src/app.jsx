import { SandpackLitComponent } from 'sandpack-lit/dist/presets/sandpack-react';
import "sandpack-lit/dist/themes/odyssey.css";

function App() {
  return (
    <div style={{ width: '900px' }}>
      <h1 style={{ textAlign: 'center' }}>React</h1>
      <SandpackLitComponent
        options={{
          closableTabs: false,
          files: { "/index.html": "<html>\n  <head lang=\"en\">\n    <title>Vite Starter</title>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <link href=\"base.css\" rel=\"stylesheet\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    \n  </head>\n  \n  <body data-theme=\"default\">\n    <lit-checkbox theme=\"default\">Checkbox</lit-checkbox>\n    <script type=\"module\" src=\"index.js\"></script>\n    <script type=\"module\" src=\"my-component.js\"></script>\n\n  </body>\n</html>\n", "/base.css": ":root {\n  --background: #f7df1e;\n}\n\nbody {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n}\n\nh1 {\n  text-transform: capitalize;\n}\n\nbody[data-theme=\"default\"] {\n  background: var(--background);\n}\n\nbody[data-theme=\"red\"] {\n  background: #c30;\n}\n\nbody[data-theme=\"green\"] {\n  background: #42b883;\n}\n\nbody[data-theme=\"blue\"] {\n  background: rgb(8, 126, 164);\n}\n\nbody[data-theme=\"gold\"] {\n  background: #f7df1e;\n}", "/index.js": "const body = document.querySelector(\"body\");\n\nwindow.addEventListener(\"theme-change\", (e) => {\n  const theme = e.detail.theme;\n  body.setAttribute(\"data-theme\", theme);\n});", "/my-component.js": "import { LitElement, html, css } from \"lit\";\n\nconst validThemes = [\"default\", \"red\", \"green\", \"blue\", \"gold\"];\n\nclass LitCheckbox extends LitElement {\n  static styles = css`\n    :host {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 8px;\n    }\n\n    h1 {\n      text-transform: capitalize;\n    }\n\n    button[checked] {\n      border: 1px solid red;\n      background: blue;\n    }\n\n    button {\n      height: 24px;\n      width: 24px;\n      padding: 0;\n      margin: 0;\n    }\n`;\n\n  static properties = {\n    theme: {\n      type: String\n    }\n  };\n\n  constructor() {\n    super();\n\n    this.theme = \"default\";\n  }\n\n  handleClick() {\n    const indexOfCurrentPos = validThemes.indexOf(this.theme);\n\n    if (indexOfCurrentPos + 1 < validThemes.length) {\n      this.theme = validThemes[indexOfCurrentPos + 1];\n    } else {\n      this.theme = validThemes[0];\n    }\n\n    const event = new CustomEvent(\"theme-change\", {\n      detail: {\n        theme: this.theme\n      },\n      composed: true,\n      bubbles: true\n    });\n    this.dispatchEvent(event);\n  }\n\n  render() {\n    return html` \n      <label for=\"indicator\">\n        <h1 id=\"label\">Theme: ${this.theme}</h1>\n      </label>\n      <button @click=${this.handleClick} id=\"indicator\"></button>\n      `\n  }\n}\n\ncustomElements.define(\"lit-checkbox\", LitCheckbox);" },
          customSetup: {
            "dependencies": {
              "lit": "2.6.1"
            }
          }
        }}
      />
    </div>
  )
}

export default App
