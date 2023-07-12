import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { SandpackContext, sandpackContext } from "../../contexts/context";
import { consume } from "@lit-labs/context";
import { when } from "lit/directives/when.js";

@customElement('sandpack-tabs')
class Tabs extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid var(--sp-colors-surface-1);
      display: flex;
      flex-wrap: wrap;
      padding: 0 8px;
      min-height: 40px;
    }

    li {
      display: flex;
    }

    button {
      all: unset;
      opacity: 0.6;
      padding: 0 8px;
      font-size: var(--sp-tab-font-size);
      font-family: var(--sp-font-body);
    }

    button:focus {
      outline: 2px solid var(--sp-tab-focus-outline-color );
      outline-offset: -4px;
    }

    li[data-active] button {
      opacity: 1;
    }
  `

  @property()
  closeableTabs = false

  // @ts-ignore
  @consume({ context: sandpackContext, subscribe: true })
  sandpack!: SandpackContext;

  updateActiveFile(fileName: string) {
    if (fileName !== this.sandpack.activeFile) {
      this.sandpack.onActiveFileChange(fileName)
    }
  }

  closeFile(fileName: string) {
    this.sandpack.onFileClose(fileName)
  }

  render() {
    const activeFile = this.sandpack.activeFile;
    const openFiles = this.sandpack.openFiles;

    return html`<ul id="tabs">
      ${openFiles.map((file) => html`<li ?data-active=${activeFile === file}>
        <button @click=${() => this.updateActiveFile(file)}>
          ${file}
        </button>
        ${when(this.closeableTabs, () => html`
        <button @click = ${() => this.closeFile(file)} aria-label="close">
          x
          </button>
        `)}
      </li>`
    )
      }
  </ul>`
  }
}

export default Tabs