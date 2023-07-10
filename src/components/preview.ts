import {
  SandpackClient,
  loadSandpackClient,
  ClientOptions,
} from "@codesandbox/sandpack-client";
import { CSSResultGroup, LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { consume } from "@lit-labs/context";
import { SandpackContext, sandpackContext } from "../contexts/context";

@customElement("sandpack-preview")
class Preview extends LitElement {
  static styles?: CSSResultGroup | undefined = css`
    :host {
      flex: 1;
    }

    #container {
      height: 100%;
    }

    iframe {
      border: 0;
      outline: 0;
      width: 100%;
      height: 100%;
      min-height: 160px;
      max-height: 2000px;
      flex: 1;
    }
  `;

  @consume<any>({ context: sandpackContext, subscribe: true })
  sandpack!: SandpackContext;

  @property({ type: 'String' })
  template: "vite" = "vite";

  @query("#iframe")
  iframe!: HTMLIFrameElement;

  @state()
  client: SandpackClient | null = null;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    const options: ClientOptions = {};
    const sandpack = this.sandpack

    const { files } = sandpack

    loadSandpackClient(this.iframe, { files }, options).then((client) => {
      this.client = client;
    });
  }

  updateClient() {
    const client = this.client;
    if (!client) return;

    this.client?.updateSandbox()
  }

  render() {
    return html` <div id="container">
      <iframe id="iframe"></iframe>
    </div>`;
  }
}

export default Preview;
