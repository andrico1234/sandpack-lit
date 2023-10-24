import { customElement, property } from 'lit/decorators.js';
import '../contexts/provider.js';
import '../components/preview.js';
import '../components/editor/editor.js';
import '../components/layout.js';
import { LitElement, html } from 'lit';
import type { PresetOptions } from '../types.js';

@customElement('sandpack-preset')
class Sandpack extends LitElement {
  _defaultOptions: PresetOptions = {
    template: 'vite',
    closableTabs: false,
    initMode: 'lazy',
    files: {}
  }

  @property()
  options: Partial<PresetOptions> = {}


  render() {
    const options = {
      ...this._defaultOptions,
      ...this.options
    }

    return html`<sandpack-provider .files=${options.files} .customSetup=${options.customSetup} template=${options.template}>
      <sandpack-layout>
        <sandpack-editor ?closableTabs=${options.closableTabs}></sandpack-editor>
        <sandpack-preview initMode=${options.initMode}></sandpack-preview>
      </sandpack-layout>
    </sandpack-provider>`
  }
}

export default Sandpack