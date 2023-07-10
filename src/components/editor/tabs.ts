import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { SandpackContext, sandpackContext } from "../../contexts/context";
import { consume } from "@lit-labs/context";

@customElement('sandpack-tabs')
class Tabs extends LitElement {
  static styles = css`
    ul {
      list-style: none;
      padding: 0;
      border: 1px solid black;
      display: flex;
    }

    li[data-active] button {
      background: red;
    }
  `

  @consume<any>({ context: sandpackContext, subscribe: true })
  sandpack!: SandpackContext;

  updateActiveFile(fileName: string) {
    if (fileName !== this.sandpack.activeFile) {
      this.sandpack.onActiveFileChange(fileName)
    }
  }

  render() {
    const fileNames = Object.keys(this.sandpack.files)
    const activeFile = this.sandpack.activeFile;

    return html`<ul id="tabs">
      ${fileNames.map((file) => html`<li ?data-active=${activeFile === file}>
        <button @click=${() => this.updateActiveFile(file)}>
          ${file}
        </button>
      </li>`
    )}
  </ul>`
  }
}

export default Tabs