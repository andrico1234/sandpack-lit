import { LitElement, html, css } from "lit";

const validThemes = ["default", "red", "green", "blue", "gold"];

class LitCheckbox extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    button[checked] {
      border: 1px solid red;
      background: blue;
    }

    button {
      height: 24px;
      width: 24px;
      padding: 0;
      margin: 0;
    }
`;

  static properties = {
    theme: {
      type: String
    }
  };

  constructor() {
    super();

    this.theme = "default";
  }

  handleClick() {
    const indexOfCurrentPos = validThemes.indexOf(this.theme);

    if (indexOfCurrentPos + 1 < validThemes.length) {
      this.theme = validThemes[indexOfCurrentPos + 1];
    } else {
      this.theme = validThemes[0];
    }

    const event = new CustomEvent("theme-change", {
      detail: {
        theme: this.theme
      },
      composed: true,
      bubbles: true
    });
    this.dispatchEvent(event);
  }

  render() {
    return html` <button @click=${this.handleClick} id="indicator"></button>
      <label>
        <p id="label">${this.theme}</p>
      </label>`
  }
}

customElements.define("lit-checkbox", LitCheckbox);