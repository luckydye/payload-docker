import { css, html, LitElement } from 'lit-element';
import { fetchApi } from '../lib/api.js';

// preloading
let loaded = false;
const loadCallbacks = [];

async function preload(requestBody, callback) {
    return fetchApi(requestBody).then(data => {
        if(!loaded) {
            loadCallbacks.push(() => {
                callback(data);
            });
        } else {
            callback(data);
        }
    })
}

function onload() {
    loaded = true;
    for(let callback of loadCallbacks) {
        callback();
    }
}


// runtime
window.addEventListener('DOMContentLoaded', onload);


export default class InlinePost extends LitElement {

    static get properties() {
        return {
            id: { type: String },
        };
    }

    static get styles() {
        return css`
            :host {
                display: block;
                margin-bottom: 40px;
                margin-left: 20px;
                margin-right: 20px;
            }
            a[href] {
                text-decoration: underline;
            }
            .paragraph h1 {
                font-size: 42px;
                padding: 0;
                font-weight: 500;
                margin: 0 0 40px 0;
            }
            .content-wrapper {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                width: 100%;
                z-index: 10;
            }
            .excerpt {

            }
            .content {

            }
            table {
                margin: 0;
                width: 100%;
            }
            table td:not(:last-child) {
                padding-right: 20px;
                box-sizing: border-box;
            }
            img {
                width: 100%;
                height: auto;
            }
            p {
                opacity: 0.75;
            }
        `;
    }

    constructor() {
        super();

        this.pageData = null;
    }

    connectedCallback() {
        super.connectedCallback();

        preload(`
            {
                post(where: { id: "${this.id}" }) {
                    content {
                        html
                    }
                }
            }
        `, data => {
            this.postData = data.post;
            this.update();
        })
    }

    render() {
        if(this.postData) {
            const frag = document.createRange().createContextualFragment(`${this.postData.content.html}`);

            return html`
                <h1>${this.postData.title}</h1>
                <div class="excerpt">
                    ${this.postData.excerpt}
                </div>
                <div class="cover-image">
                    ${this.postData.coverImage ? html`<img src="${this.postData.coverImage.url}" width="100%"/>` : ""}
                </div>
                <div class="content">
                    ${frag}
                </div>
            `;
        }
    }
}

customElements.define('inline-post', InlinePost);