import { customElement, property } from 'lit/decorators.js';
import '../contexts/provider';
import '../components/preview';
import '../components/editor/editor';
import '../components/layout';
import { LitElement, html } from 'lit';
import { PresetOptions } from '../types';
import exercises from '../exercises';

@customElement('sandpack-preset')
class Sandpack extends LitElement {
  @property()
  options: PresetOptions = {
    files: exercises[0].files,
    customSetup: exercises[0].customSetup,
    template: 'vite',
    closableTabs: false,
    initMode: 'lazy'
  }


  render() {
    return html`<sandpack-provider .files=${this.options.files} .customSetup=${this.options.customSetup} template=${this.options.template}>
      <sandpack-layout>
        <sandpack-editor ?closableTabs=${this.options.closableTabs}></sandpack-editor>
        <sandpack-preview initMode=${this.options.initMode}></sandpack-preview>
      </sandpack-layout>
    </sandpack-provider>`
  }
}

export default Sandpack