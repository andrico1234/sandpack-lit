const examples = {
    files: {"/index.html":"<html>\n  <head lang=\"en\">\n    <title>Vite Starter</title>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <link href=\"base.css\" rel=\"stylesheet\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    \n  </head>\n  \n  <body data-theme=\"default\">\n    <lit-checkbox theme=\"default\">Checkbox</lit-checkbox>\n    <script type=\"module\" src=\"index.js\"></script>\n    <script type=\"module\" src=\"my-component.js\"></script>\n\n  </body>\n</html>\n","/base.css":":root {\n  --background: gold;\n}\n\nbody[data-theme=\"default\"] {\n  background: var(--background);\n}\n\nbody[data-theme=\"red\"] {\n  background: red;\n}\n\nbody[data-theme=\"green\"] {\n  background: green;\n}\n\nbody[data-theme=\"blue\"] {\n  background: blue;\n}\n\nbody[data-theme=\"gold\"] {\n  background: goldenrod;\n}\n","/index.js":"const body = document.querySelector(\"body\");\n\nwindow.addEventListener(\"theme-change\", (e) => {\n  const theme = e.detail.theme;\n  body.setAttribute(\"data-theme\", theme);\n});","/my-component.js":"import { LitElement, html, css } from \"lit\";\n\nconst validThemes = [\"default\", \"red\", \"green\", \"blue\", \"gold\"];\n\nclass LitCheckbox extends LitElement {\n  static styles = css`\n    :host {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      gap: 8px;\n    }\n\n    button[checked] {\n      border: 1px solid red;\n      background: blue;\n    }\n\n    button {\n      height: 24px;\n      width: 24px;\n      padding: 0;\n      margin: 0;\n    }\n`;\n\n  static properties = {\n    theme: {\n      type: String\n    }\n  };\n\n  constructor() {\n    super();\n\n    this.theme = \"default\";\n  }\n\n  handleClick() {\n    const indexOfCurrentPos = validThemes.indexOf(this.theme);\n\n    if (indexOfCurrentPos + 1 < validThemes.length) {\n      this.theme = validThemes[indexOfCurrentPos + 1];\n    } else {\n      this.theme = validThemes[0];\n    }\n\n    const event = new CustomEvent(\"theme-change\", {\n      detail: {\n        theme: this.theme\n      },\n      composed: true,\n      bubbles: true\n    });\n    this.dispatchEvent(event);\n  }\n\n  render() {\n    return html` <button @click=${this.handleClick} id=\"indicator\"></button>\n      <label>\n        <p id=\"label\">${this.theme}</p>\n      </label>`\n  }\n}\n\ncustomElements.define(\"lit-checkbox\", LitCheckbox);"},
    customSetup: {
  "dependencies": {
    "lit": "2.6.1"
  }
}

  };
  
  export default examples;