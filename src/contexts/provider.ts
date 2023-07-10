import { provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sandpackContext, SandpackContext, getFileState } from "./context";
import exercises from "../exercises";

const lesson = exercises[0];
@customElement('sandpack-provider')
class Provider extends LitElement {
  onFileChange() {
    console.log('updated file')
  }

  @state()
  files = lesson.files

  @state()
  template: 'vite' = 'vite'

  @state()
  activeFile: string = Object.keys(lesson.files)[0]

  @provide({ context: sandpackContext })
  @state()
  context: SandpackContext = getFileState({
    onFileChange: this.onFileChange,
    files: this.files,
    template: this.template,
    activeFile: this.activeFile,
  })


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