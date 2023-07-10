import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('sandpack-layout')
class Layout extends LitElement {
  static styles = css`  
    #outer-container {
      border: 1px solid red;
      container-type: inline-size; 
    }
    
    #inner-container {
      display: flex;
      flex-direction: column;
      max-height: 400px;
      overflow: hidden;
    }

    @container (min-width: 600px) {
      #inner-container {
        flex-direction: row;
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