import { javascript } from "@codemirror/lang-javascript";
import { consume } from "@lit-labs/context";
import { EditorView, basicSetup } from "codemirror";
import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
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

export const getEditorTheme = () =>
  EditorView.theme({
    "&": {
      backgroundColor: `var(--sp-colors-surface-1)`,
      color: `var(--sp-syntax-plain)`,
      height: "100%",
      fontSize: 'var(--sp-font-size)',
    },

    ".cm-matchingBracket, .cm-nonmatchingBracket, &.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket":
      {
        color: "inherit",
        backgroundColor: `rgba(128,128,128,.25)`,
        backgroundBlendMode: "difference",
      },

    "&.cm-editor.cm-focused": {
      outline: "none",
    },

    ".cm-activeLine": {
      backgroundColor: `var(--sp-colors-surface-3)`,
      borderRadius: `var(--sp-border-radius)`,
    },

    ".cm-errorLine": {
      backgroundColor: `var(--sp-colors-error-surface)`,
      borderRadius: `var(--sp-border-radius)`,
    },

    ".cm-content": {
      caretColor: `var(--sp-colors-accent)`,
      padding: `0 var(--sp-space-4)`,
    },

    ".cm-scroller": {
      fontFamily: `var(--sp-font-mono)`,
      lineHeight: `var(--sp-font-line-height)`,
    },

    ".cm-gutters": {
      backgroundColor: `var(--sp-colors-surface-1)`,
      color: `var(--sp-colors-disabled)`,
      border: "none",
      paddingLeft: `var(--sp-space-1)`,
    },

    ".cm-gutter.cm-lineNumbers": {
      fontSize: ".6em",
    },

    ".cm-lineNumbers .cm-gutterElement": {
      lineHeight: `var(--sp-font-line-height)`,
      minWidth: `var(--sp-space-5)`,
    },

    ".cm-content .cm-line": { paddingLeft: `var(--sp-space-1)` },
    ".cm-content.cm-readonly .cm-line": { paddingLeft: 0 },
  });


@customElement('sandpack-editor')
class Editor extends LitElement {
  static styles = css`
    :host {
      flex: 1;
      overflow-y: scroll;
      border-right: 1px solid var(--sp-colors-surface-1);
    }

    #editor-outer-container {
      display: flex;
      flex-direction: row;
    }

    #container {
      width: 100%;
    }
    `

  view!: EditorView

  currKey!: string;

  @property()
  closableTabs = false

  @query('#container')
  container!: HTMLDivElement;

  // @ts-ignore
  @consume({ context: sandpackContext, subscribe: true })
  sandpack!: SandpackContext;

  initialiseEditor() {
    const key = this.sandpack.activeFile
    this.currKey = key
    const file = this.sandpack.files[key]

    if (!file) {
      return null
    }

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
    return html`<sandpack-tabs ?closableTabs=${this.closableTabs}></sandpack-tabs>
      <div id="editor-outer-container">
        <div id="container"></div>
      </div>`
  }
}

export default Editor;