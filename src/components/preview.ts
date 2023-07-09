import {
  SandpackClient,
  loadSandpackClient,
  ClientOptions,
} from "@codesandbox/sandpack-client";
import { CSSResultGroup, LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import exercises from "../exercises/index";
import SANDPACK_TEMPLATES from "../templates";

// useFiles
// - update file

@customElement("sandpack-preview")
class Preview extends LitElement {
  static styles?: CSSResultGroup | undefined = css`
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

  template: "vite" = "vite";

  @query("#iframe")
  iframe!: HTMLIFrameElement;

  @property({ type: Object })
  files = exercises[0];

  @property({ type: String })
  environment = "vanilla";

  @state()
  client: SandpackClient | null = null;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    const template = SANDPACK_TEMPLATES[this.template];

    const options: ClientOptions = {};

    loadSandpackClient(
      this.iframe,
      {
        files: template.files,
      },
      options
    ).then((client) => {
      this.client = client;
    });
  }

  render() {
    return html` <div>
      <p id="fake">Code preview</p>
      <iframe id="iframe"> </iframe>
    </div>`;
  }
}

export default Preview;
