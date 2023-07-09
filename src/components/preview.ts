import {
  SandpackClient,
  loadSandpackClient,
  ClientOptions,
} from "@codesandbox/sandpack-client";
import { CSSResultGroup, LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import exercises from "../exercises/index";
import combineTemplateFilesToSetup from "../helpers/combineTemplateFilesToSetup";

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
    const options: ClientOptions = {};
    const lesson = exercises[0];

    const files = combineTemplateFilesToSetup({
      template: "vite",
      files: lesson.files,
      customSetup: lesson.customSetup,
    });

    loadSandpackClient(this.iframe, files, options).then((client) => {
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
