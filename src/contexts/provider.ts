import { provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sandpackContext, SandpackContext } from "./context";
import exercises from "../exercises";
import combineTemplateFilesToSetup from "../helpers/combineTemplateFilesToSetup";

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
    const file = this.files[fileName].code;
    this.#updateFile(file);
    this.updateContext()
  }

  @state()
  files = combineTemplateFilesToSetup({
    template: 'vite',
    files: lesson.files,
  }).files

  @state()
  activeFile: string = Object.keys(lesson.files)[0]

  @provide({ context: sandpackContext })
  @state()
  context: SandpackContext = {
    onFileChange: this.onFileChange,
    onActiveFileChange: this.onActiveFileChange,
    files: this.files,
    activeFile: this.activeFile,
  }

  updateContext = () => {
    this.context = {
      onFileChange: this.onFileChange,
      onActiveFileChange: this.onActiveFileChange,
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