import {
  SandpackClient,
  loadSandpackClient,
  ClientOptions,
} from "@codesandbox/sandpack-client";
import { CSSResultGroup, LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { SandpackContext, sandpackContext } from "../contexts/context";
import { when } from "lit/directives/when.js";
import { InitMode, SandboxTemplateKey } from "../types";
import { ElementVisible } from "../mixins/ElementVisibleMixin";

const options: ClientOptions = {
  showOpenInCodeSandbox: false,
  showLoadingScreen: true,
  startRoute: '/index.html',
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
          if (e.type === 'done') {
            if (e.compilatonError) {
              this.status = 'error'
            }
            return
          }

          if (this.status === 'done') return
          this.status = client.status
        })
      });
      return;
    }

    this.client.updateSandbox({ files: this.sandpack.files, template: 'node' })
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
