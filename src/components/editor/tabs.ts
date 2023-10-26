import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sandpackContext } from "../../contexts/context.js";
import type { SandpackContext } from "../../contexts/context.js";
import { consume } from "@lit-labs/context";
import { when } from "lit/directives/when.js";
import { closeIcon } from "../icons/close.js";

@customElement("sandpack-tabs")
class Tabs extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      position: sticky;
      background: var(--sp-colors-surface-1);
      z-index: 1;
      display: block;
      top: 0;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid var(--sp-border-color);
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
      cursor: pointer;
      opacity: var(--sp-tab-font-opacity-inactive, 0.6);
      padding: 0 8px;
      color: var(--sp-tab-font-color, black);
      font-size: var(--sp-tab-font-size);
      font-family: var(--sp-font-body);
    }

    button:focus {
      outline: 2px solid var(--sp-tab-focus-outline-color);
      outline-offset: -4px;
    }

    li[data-active] button {
      opacity: 1;
    }
  `;

  @property()
  closeableTabs = false;

  // @ts-ignore
  @consume({ context: sandpackContext, subscribe: true })
  sandpack!: SandpackContext;

  updateActiveFile(fileName: string) {
    if (fileName !== this.sandpack.activeFile) {
      this.sandpack.onActiveFileChange(fileName);
    }
  }

  closeFile(fileName: string) {
    this.sandpack.onFileClose(fileName);
  }

  render() {
    const activeFile = this.sandpack.activeFile;
    const openFiles = this.sandpack.openFiles;

    return html`<ul id="tabs">
      ${openFiles.map(
        (file) =>
          html`<li ?data-active=${activeFile === file}>
            <button @click=${() => this.updateActiveFile(file)}>${file}</button>
            ${when(
              this.closeableTabs,
              () => html`
                <button @click=${() => this.closeFile(file)} aria-label="close">
                  ${closeIcon}
                </button>
              `
            )}
          </li>`
      )}
    </ul>`;
  }
}

export default Tabs;
