import { LitElement, html, css } from "lit";

const validThemes = ["default", "red", "green", "blue", "gold"];

class LitCheckbox extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    h1 {
      text-transform: capitalize;
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
    return html` 
      <label for="indicator">
        <h1 id="label">Theme: ${this.theme}</h1>
      </label>
      <button @click=${this.handleClick} id="indicator"></button>
      `
  }
}

customElements.define("lit-checkbox", LitCheckbox);