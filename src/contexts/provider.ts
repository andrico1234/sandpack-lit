import { provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sandpackContext, SandpackContext } from "./context";
import exercises from "../exercises";
import combineTemplateFilesToSetup from "../helpers/combineTemplateFilesToSetup";
import setupStartingFiles from "../helpers/setupStartingFiles";

const lesson = exercises[0];

@customElement('sandpack-provider')
class Provider extends LitElement {
  onFileChange = (newFile: string) => {
    this.#updateFile(newFile)
    this.updateContext()
  }

  #updateFile = (newFile: string) => {
    const files = this.files
    const activeFile = this.activeFile;
    files[activeFile].code = newFile
  }

  onActiveFileChange = (fileName: string) => {
    this.activeFile = fileName

    if (this.activeFile) {
      const file = this.files[fileName].code;
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

  @state()
  files = setupStartingFiles({
    template: 'vite',
    files: lesson.files,
    customSetup: lesson.customSetup
  }).files

  @state()
  activeFile: string = Object.keys(lesson.files)[0]

  @state()
  openFiles: string[] = Object.keys(lesson.files)

  @provide({ context: sandpackContext })
  @state()
  context: SandpackContext = {
    onFileChange: this.onFileChange,
    onActiveFileChange: this.onActiveFileChange,
    openFiles: this.openFiles,
    onFileClose: this.onFileClose,
    files: this.files,
    activeFile: this.activeFile,
  }

  updateContext = () => {
    this.context = {
      onFileChange: this.onFileChange,
      onActiveFileChange: this.onActiveFileChange,
      openFiles: this.openFiles,
      onFileClose: this.onFileClose,
      files: this.files,
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