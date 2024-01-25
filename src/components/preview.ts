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
      inset: 50% 0px 0px;
      text-align: center;
      transform: translateY(-50%);
      text-align: center;
      height: fit-content;
    }

    #loading > p {
      margin: 0;
    }

    #loading progress {
      -webkit-appearance: none;
      -moz-appearance: none;
           appearance: none;
      width: calc(var(--sp-loading-indicator-size) + var(--sp-loading-indicator-border-size) * 2);
      height: calc(var(--sp-loading-indicator-size) + var(--sp-loading-indicator-border-size) * 2);
      margin: 8px;
      position: relative;
      border: 0;
      background: none;
    }

    #loading progress:after {
      content: " ";
      display: block;
      width: var(--sp-loading-indicator-size);
      position: absolute;
      top: 0;
      left: 0;
      height: var(--sp-loading-indicator-size);
      border-radius: 50%;
      border: var(--sp-loading-indicator-border-size) solid #fff;
      border-color: var(--sp-loading-indicator-color) transparent var(--sp-loading-indicator-color) transparent;
      animation: loading 1.2s linear infinite;
    }

    @keyframes loading {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    #loading progress:indeterminate::-moz-progress-bar {
      background: none; /* display:none doesn’t work, don’t ask me why */
    }

    #loading progress:indeterminate::-webkit-progress-bar {
      display: none;
    }
  
    loading progress:indeterminate::-ms-fill {
      animation-name: none;
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
      ${when(this.status === 'error', () => html`
        <div id="loading">
          <p>There was an error compiling your code</p>
          <p>Please check that your code is correct. Browser privacy features can also cause issues</p>
        </div>
      `)}
      ${when(this.status !== 'done' && this.status !== 'error', () => html`<div id="loading">
        <p>${this.status}</p>
        <progress></progress>
      </div>`)}
      <iframe id="iframe"></iframe>
    </div>`;
  }
}

export default Preview;
