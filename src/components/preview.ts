import type {
  SandpackClient,
  ClientOptions,
} from "@codesandbox/sandpack-client";
import { loadSandpackClient } from "@codesandbox/sandpack-client";
import { LitElement, css, html } from "lit";
import type { CSSResultGroup } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { sandpackContext } from "../contexts/context.js";
import type { SandpackContext } from "../contexts/context.js";
import { when } from "lit/directives/when.js";
import type { InitMode, SandboxTemplateKey } from "../types.js";
import { ElementVisible } from "../mixins/ElementVisibleMixin.js";

const options: ClientOptions = {
  showOpenInCodeSandbox: false,
  showLoadingScreen: true,
  startRoute: '/',
};

@customElement("sandpack-preview")
class Preview extends ElementVisible(LitElement, { removeOnceVisible: true }) {
  static styles?: CSSResultGroup | undefined = css`
    :host {
      flex: 1;
      font-family: var(--sp-font-body);
    }

    #container {
      height: 100%;
      position: relative;
    }

    #loading {
      position: absolute;
      top: 50%;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    }

    #loading > p {
      margin: 0;
    }

    iframe {
      border: 0;
      outline: 0;
      width: 100%;
      height: 100%;
      flex: 1;
    }
  `;

  // @ts-ignore
  @consume({ context: sandpackContext, subscribe: true })
  sandpack!: SandpackContext;

  @property({ type: String })
  template: SandboxTemplateKey = "vite";

  @property({ type: String })
  initMode: InitMode = 'lazy'

  @query("#iframe")
  iframe!: HTMLIFrameElement;

  @state()
  client!: SandpackClient;

  @state()
  status = "idle";

  connectedCallback(): void {
    super.connectedCallback();

    if (!this.sandpack) {
      console.warn('No sandpack context found')
    }
  }

  protected updated() {
    this.updateClient()
  }

  refresh() {
    // This is a hack because once Vite disconnects due to an error, I can't seem to get it to reconnect
    this.client.dispatch({ type: 'refresh' })
  }

  updateClient() {
    if (!this.client) {

      const shouldLoad = this.initMode === 'immediate' || this.isVisible

      if (!shouldLoad) return

      const sandpack = this.sandpack

      const { files } = sandpack

      loadSandpackClient(this.iframe, { files, template: 'node', entry: 'index.js' }, options).then((client) => {
        this.status = client.status
        this.client = client;

        client.listen((e) => {
          if (this.status === 'done') return

          if (e.type === 'done') {
            if (e.compilatonError) {
              this.status = 'error'
            }
            return
          }

          this.status = client.status
        })
      });
      return;
    }

    this.client.updateSandbox({ files: this.sandpack.files, template: 'node' })
    this.refresh()
  }

  render() {
    return html`<div id="container">
      ${when(this.status !== 'done', () => html`<div id="loading">
        <p>${this.status}</p>
      </div>`)}
      <iframe id="iframe"></iframe>
    </div>`;
  }
}

export default Preview;
