import { css, html, LitElement } from "lit-element";
import { fetchApi } from "../lib/api.js";
import "./LinkButton.js";

export class ExampleList extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      @keyframes show {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 100px 40px;
        animation: show 0.2s ease;
      }
      @media screen and (max-width: 1500px) {
        .list {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
      @media screen and (max-width: 900px) {
        .list {
          grid-template-columns: 1fr 1fr;
        }
      }
      .item {
        display: grid;
        grid-template-rows: auto auto auto auto auto 1fr;
      }
      .date {
        font-size: 13px;
        letter-spacing: 1px;
        margin-top: 5px;
        opacity: 0.5;
      }
      .title {
        font-family: "Lato";
        font-weight: 400;
        font-size: 20px;
        margin: 0;
      }
      .preview {
        width: 100%;
        height: 150px;
        object-fit: cover;
        overflow: hidden;
        margin-bottom: 15px;
        box-shadow: 2px 4px 8px rgb(0 0 0 / 25%);
      }
      .description {
        margin-top: 15px;
        font-size: 14px;
      }
      .item-link {
        display: contents;
      }
      .placeholder {
        padding: 15px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        position: relative;
        overflow: hidden;
      }
      .placeholder span {
        opacity: 0.25;
      }
      .placeholder:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100vh;
        background: linear-gradient(transparent, grey, transparent);
        width: 100px;
        opacity: 0;
        transform: translate(0px, -50%) rotate(45deg);
        animation: 1.5s ease 0s infinite normal none running load;
        filter: blur(100px);
      }
      @keyframes load {
        0% {
          opacity: 0;
          transform: translate(-60vw, -50%) rotate(45deg);
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 0;
          transform: translate(60vw, -50%) rotate(45deg);
        }
      }
    `;
  }

  constructor() {
    super();

    this.items = [];

    fetchApi(`
            {
                projects() {
                    title
                    url
                    editorialDate
                    preview {
                        url
                    }
                    description
                }
            }
        `).then((data) => {
      this.items = data.projects;
      this.update();
      this.dispatchEvent(new Event("load"));
    });
  }

  render() {
    if (this.items.length === 0) {
      return html`
        <div class="placeholder">
          <span></span>
        </div>
      `;
    } else {
      return html`
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
          type="text/css"
        />

        <div class="list">
          ${this.items
            .sort((itemA, itemB) => {
              return (
                new Date(itemB.editorialDate) - new Date(itemA.editorialDate)
              );
            })
            .map((item) => {
              const date = new Date(item.editorialDate);
              return html`
                <div class="item-link">
                  <div class="item">
                    <img class="preview" src="${item.preview.url}" />
                    <h3 class="title">${item.title}</h3>
                    <div class="date">${date.toLocaleDateString()}</div>
                    <div class="description">${item.description}</div>
                    ${item.url.match("javascript:")
                      ? html`<link-button href="${item.url}"
                          >Open project</link-button
                        >`
                      : html`<link-button target="_blank" href="${item.url}"
                          >Open project</link-button
                        >`}
                  </div>
                </div>
              `;
            })}
        </div>
      `;
    }
  }
}

customElements.define("project-list", ExampleList);
