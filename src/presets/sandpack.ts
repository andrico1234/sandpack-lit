import { customElement, property } from 'lit/decorators.js';
import '../contexts/provider';
import '../components/preview';
import '../components/editor/editor';
import '../components/layout';
import { LitElement, html } from 'lit';

@customElement('sandpack-preset')
class Sandpack extends LitElement {
  @property()
  options = {
    closableTabs: false
  }


  render() {
    return html`<sandpack-provider>
      <sandpack-layout>
        <sandpack-editor ?closableTabs=${this.options.closableTabs}></sandpack-editor>
        <sandpack-preview></sandpack-preview>
      </sandpack-layout>
    </sandpack-provider>`
  }
}

export default Sandpack