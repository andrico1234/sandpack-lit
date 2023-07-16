import { customElement, property } from 'lit/decorators.js';
import '../contexts/provider';
import '../components/preview';
import '../components/editor/editor';
import '../components/layout';
import { LitElement, html } from 'lit';
import { PresetOptions } from '../types.js';

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