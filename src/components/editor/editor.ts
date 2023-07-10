import { javascript } from "@codemirror/lang-javascript";
import { consume } from "@lit-labs/context";
import { EditorView, basicSetup } from "codemirror";
import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, query } from "lit/decorators.js";
import { SandpackContext, sandpackContext } from "../../contexts/context";
import './tabs'
import { SandpackFile } from "../../types";
import { css as langCss } from "@codemirror/lang-css";
import { html as langHtml } from "@codemirror/lang-html";

const getCodefromFile = (file: SandpackFile | string) => {
  if (typeof file === 'string') {
    return file
  }

  return file.code
}

const getFileLangFromExtension = (lang: string) => {
  const extension = lang.split('.')[1]

  if (extension === 'js') return javascript({ typescript: false })
  if (extension === 'ts') return javascript({ typescript: true })
  if (extension === 'css') return langCss()
  return langHtml()
}

@customElement('sandpack-editor')
class Editor extends LitElement {
  static styles = css`
    :host {
      flex: 1;
      overflow-y: scroll;
    }
    `

  view!: EditorView

  currKey!: string;

  @query('#container')
  container!: HTMLDivElement;

  @consume<any>({ context: sandpackContext, subscribe: true })
  sandpack!: SandpackContext;

  initialiseEditor() {
    const key = this.sandpack.activeFile
    this.currKey = key
    const file = this.sandpack.files[key]
    const code = getCodefromFile(file)
    const langExtension = getFileLangFromExtension(key)

    this.view = new EditorView({
      doc: code,
      extensions: [basicSetup, langExtension],
      parent: this.container!,
      dispatch: (tr) => {
        this.view.update([tr])

        if (tr.docChanged) {
          const newDoc = tr.newDoc.sliceString(0, tr.newDoc.length)

          this.sandpack.onFileChange(newDoc)
        }
      }
    })
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.initialiseEditor()
  }

  protected updated() {
    if (this.currKey !== this.sandpack.activeFile) {
      this.#updateActivePage()
    }
  }

  #updateActivePage() {
    const view = this.view;

    if (!view) return;

    view.destroy()
    this.initialiseEditor()
  }

  render() {
    return html`
      <sandpack-tabs></sandpack-tabs>
      <div id="container"></div>
      `
  }
}

export default Editor;