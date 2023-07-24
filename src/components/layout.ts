import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('sandpack-layout')
class Layout extends LitElement {
  static styles = css`  
    #outer-container {
      width: 100%;
      margin-inline: auto;
      container-type: inline-size; 
      display:  block;
      border: 1px solid var(--sp-font-color);
      background: white;
      filter: var(--sp-wrapper-shadow);
    }

    #inner-container {
      display: flex;
      flex-direction: column;
      height: var(--sp-editor-height-sm-container, 600px);
      overflow: hidden;
    }
    
    @container (min-width: 600px) {
      #inner-container {
        flex-direction: row;
        height: var(--sp-editor-height-lg-container, 400px);
      }
    }
  `

  render() {
    return (
      html`<div id="outer-container">
        <div id="inner-container">
          <slot></slot>
        </div>
    </div>`
    )
  }
}

export default Layout