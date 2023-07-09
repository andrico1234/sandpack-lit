import { provide } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { sandpackContext, Context, getInitialState } from "./context";
import exercises from "../exercises";

const lesson = exercises[0];

@customElement('sandpack-provider')
class Provider extends LitElement {
  @provide({ context: sandpackContext })
  @state()
  data: Context = getInitialState({
    files: lesson.files,
    template: 'vite',
  })

  render() {
    console.log('ooo')

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