import { css, html, LitElement } from "lit-element";
import ShapeStyles from "../../styles/ShapeStyle.js";
import "../LinkButton.js";

// Components

export default class GallaryItem extends LitElement {
  static get styles() {
    return css`
      ${ShapeStyles}

      :host {
        user-select: none;
        display: block;
        width: 470px;
        height: 740px;
        flex: none;
        transition: filter 0.15s ease 0.1s, transform 0.2s ease;
        max-width: 100%;
        animation: slide_in_list 0.5s var(--delay, 0s)
          cubic-bezier(0, 0.86, 0.25, 1) backwards;
      }

      @keyframes slide_in_list {
        from {
          opacity: 0;
          transform: translate(150px, 0);
        }
      }

      :host([current]:hover) {
        transform: scale(1.005);
      }
      .outer-item {
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
      }
      .item {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr;
        position: relative;
        overflow: hidden;
        border-radius: 6px;
      }
      .title {
        font-family: "Lato", sans-serif;
        font-weight: 400;
        font-size: 20px;
        margin-bottom: 15px;
      }
      .preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.2s ease-out;
        pointer-events: none;
      }
      .description {
        margin: 20px 130px 60px 40px;
        box-sizing: border-box;
        overflow: hidden;
        font-size: 15px;
      }
      .inner-description {
        transition: transform 0.3s ease;
      }
      .outer-description {
        transition: opacity 0.2s ease;
        position: absolute;
        bottom: 0;
        background: linear-gradient(45deg, black, rgba(0, 0, 0, 0.1));
      }
      link-button {
        --display-icon: none;
        --padding: 10px 28px;
      }
      link-button:hover {
        --background: #ffffff;
      }
      link-button:active {
        --background: #c2c2c2;
      }
    `;
  }

  constructor(data) {
    super();
    this.data = data;
  }

  render() {
    return html`
      <div class="outer-item">
        <div class="item">
          <img class="preview" src="${this.data.preview.url}" />
          <div class="outer-description">
            <div class="description">
              <h3 class="title">${this.data.title}</h3>
              <div class="inner-description">${this.data.description}</div>
              <br />
              <br />
              <link-button href="${this.data.url}" target="_blank"
                >Open</link-button
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("gallary-item", GallaryItem);
