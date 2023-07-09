import { customElement } from 'lit/decorators.js';
import '../contexts/provider';
import '../components/preview';
import { LitElement, html } from 'lit';

/* 
<provider>
  <layout>
    <code-editor></code-editor>
    <sandbpack-preview></sandpack-preview>
  </layout>
</provider>
*/
@customElement('sandpack-preset')
class Sandpack extends LitElement {
  render() {
    return html`<sandpack-provider>
      <sandpack-preview></sandpack-preview>
    </sandpack-provider>
      `
  }
}

export default Sandpack