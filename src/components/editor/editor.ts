import { javascript } from "@codemirror/lang-javascript";
import { consume } from "@lit-labs/context";
import { EditorView, basicSetup } from "codemirror";
import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { sandpackContext } from "../../contexts/context.js";
import type { SandpackContext } from "../../contexts/context.js";
import './tabs.js'
import type { SandpackFile } from "../../types.js";
import { css as langCss } from "@codemirror/lang-css";
import { html as langHtml } from "@codemirror/lang-html";
import { tags } from '@lezer/highlight';
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { syntaxHighlightingStyles } from './syntaxHighlighting.js'
import { highlightSpecialChars } from "@codemirror/view";

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

const getEditorTheme = () =>
  EditorView.theme({
    "&": {
      backgroundColor: `var(--sp-colors-surface-1)`,
      color: `var(--sp-syntax-plain)`,
      height: "100%",
      fontSize: 'var(--sp-font-size)',
      boxSizing: "border-box",
      textAlign: 'left'
    },

    ".cm-matchingBracket, .cm-nonmatchingBracket, &.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket":
    {
      color: "inherit",
      backgroundColor: `var(--sp-syntax-matching-bracket-color)`,
      backgroundBlendMode: "difference",
    },

    ".cm-activeLine": {
      backgroundColor: `var(--sp-colors-surface-3)`,
    },

    ".cm-errorLine": {
      backgroundColor: `var(--sp-colors-error-surface)`,
    },

    ".cm-content": {
      caretColor: `var(--sp-colors-accent)`,
      // padding: `0 var(--sp-space-4)`,
    },

    ".cm-scroller": {
      fontFamily: `var(--sp-font-mono)`,
      lineHeight: `var(--sp-font-line-height)`,
    },

    ".cm-gutters": {
      backgroundColor: `var(--sp-colors-surface-1)`,
      color: `var(--sp-colors-disabled)`,
      border: "0 1px 1px 0",
      borderColor: 'var(--sp-border-color)',
      paddingLeft: `var(--sp-space-2)`,
    },

    ".cm-gutter.cm-lineNumbers": {
      fontSize: "0.8rem",
    },

    ".cm-lineNumbers .cm-gutterElement": {
      lineHeight: `var(--sp-font-line-height)`,
      minWidth: `var(--sp-space-5)`,
    },

    ".cm-content .cm-line": { paddingLeft: `var(--sp-space-1)` },
    ".cm-content.cm-readonly .cm-line": { paddingLeft: 0 },
  });

const classNameToken = (className: string) => {
  return `sp-syntax-${className}`
}

const getHighlightStyle = () => {
  return HighlightStyle.define([
    { tag: tags.link, textDecoration: "underline" },
    { tag: tags.emphasis, fontStyle: "italic" },
    { tag: tags.strong, fontWeight: "bold" },

    {
      tag: tags.keyword,
      class: classNameToken("keyword"),
    },
    {
      tag: [tags.atom, tags.number, tags.bool],
      class: classNameToken("static"),
    },
    {
      tag: tags.variableName,
      class: classNameToken("plain"),
    },
    {
      // Standard tags, e.g <h1 />
      tag: tags.standard(tags.tagName),
      class: classNameToken("tag"),
    },
    {
      tag: [
        // Highlight function call
        tags.function(tags.variableName),

        // Highlight function definition differently (eg: functional component def in React)
        tags.definition(tags.function(tags.variableName)),

        // "Custom tags", meaning React component
        tags.tagName,
      ],
      class: classNameToken("definition"),
    },
    {
      tag: tags.propertyName,
      class: classNameToken("property"),
    },
    {
      tag: tags.attributeName,
      class: classNameToken("attribute"),
    },
    {
      tag: [tags.literal, tags.inserted],
      class: classNameToken("string"),
    },
    {
      tag: tags.punctuation,
      class: classNameToken("punctuation"),
    },
    {
      tag: [tags.comment, tags.quote],
      class: classNameToken("comment"),
    },
  ])
}

@customElement('sandpack-editor')
class Editor extends LitElement {
  static styles = [syntaxHighlightingStyles, css`
    :host {
      flex: 1;
      overflow-y: scroll;
      border-right: 1px solid var(--sp-border-color);
    }

    #editor-outer-container {
      display: flex;
      flex-direction: row;
    }

    #container {
      width: 100%;
    }
    `]

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
      extensions: [basicSetup, langExtension, highlightSpecialChars(), getEditorTheme(), syntaxHighlighting(getHighlightStyle())],
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

  protected firstUpdated(): void {
    this.initialiseEditor()
  }

  protected updated() {
    if (this.currKey !== this.sandpack.activeFile) {
      this.#updateActivePage()
    }
  }

  #updateActivePage() {
    const view = this.view;

    if (view) {
      view.destroy()
    }

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