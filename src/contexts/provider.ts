import { provide } from "@lit-labs/context";
import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sandpackContext, SandpackContext } from "./context";
import setupStartingFiles from "../helpers/setupStartingFiles";
import { SandboxTemplateKey, SandpackFiles, SandpackSetup } from "../types";

@customElement('sandpack-provider')
class Provider extends LitElement {
  onFileChange = (newFile: string) => {
    this.#updateFile(newFile)
    this.updateContext()
  }

  #updateFile = (newFile: string) => {
    const files = this._files
    const activeFile = this.activeFile;
    files[activeFile].code = newFile
  }

  onActiveFileChange = (fileName: string) => {
    this.activeFile = fileName

    if (this.activeFile) {
      const file = this._files[fileName].code;
      this.#updateFile(file);
      this.updateContext()
    }
  }

  onFileClose = (fileName: string) => {
    this.openFiles = this.openFiles.filter((file) => file !== fileName)

    if (fileName === this.activeFile) {
      this.activeFile = this.openFiles[0]
    }

    this.updateContext()
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    if (_changedProperties.has('files')) {
      this._files = setupStartingFiles({
        template: this.template,
        files: this.files,
        customSetup: this.customSetup
      }).files

      this.activeFile = Object.keys(this.files)[0]
      this.openFiles = Object.keys(this.files)

      this.updateContext()
    }
  }

  @property({ type: String })
  template: SandboxTemplateKey = 'vite'

  @property({ type: Object })
  files: SandpackFiles = {}

  @property({ type: Object })
  customSetup: SandpackSetup = {}

  @state()
  _files = setupStartingFiles({
    template: this.template,
    files: this.files,
    customSetup: this.customSetup
  }).files

  @state()
  activeFile: string = Object.keys(this.files)[0]

  @state()
  openFiles: string[] = Object.keys(this.files)

  @provide({ context: sandpackContext })
  @state()
  context: SandpackContext = {
    onFileChange: this.onFileChange,
    onActiveFileChange: this.onActiveFileChange,
    openFiles: this.openFiles,
    onFileClose: this.onFileClose,
    files: this._files,
    activeFile: this.activeFile,
  }

  updateContext = () => {
    this.context = {
      onFileChange: this.onFileChange,
      onActiveFileChange: this.onActiveFileChange,
      openFiles: this.openFiles,
      onFileClose: this.onFileClose,
      files: this._files,
      activeFile: this.activeFile,
    }

    this.requestUpdate()
  }


  render() {
    return (
      html`
        <div>
          <slot />
        </div>
      `
    )
  }
}

export default Provider