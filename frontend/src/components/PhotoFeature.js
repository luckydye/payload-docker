import { css, html, LitElement } from 'lit-element';
import { fetchApi } from '../lib/api.js';

// preloading
let loaded = false;
const loadCallbacks = [];

async function preload(requestBody, callback) {
    return fetchApi(requestBody).then(data => {
        if (!loaded) {
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
    for (let callback of loadCallbacks) {
        callback();
    }
}


// runtime
window.addEventListener('DOMContentLoaded', onload);


export default class PhotoFeature extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }
            .feature {
                box-shadow: 1px 2px 24px rgba(0, 0, 0, 0.2);
                pointer-events: none;
            }
            .caption {
                margin-top: 10px;
            }
        `;
    }

    static get properties() {
        return {
            slug: { type: String },
        };
    }

    constructor() {
        super();

        this.data = null;
    }

    connectedCallback() {
        super.connectedCallback();

        preload(`
            {
                asset(where: { id: "${this.slug}" }) {
                    title
                    description
                    url
                }
            }
        `, data => {
            this.data = data;
            this.update();
        })
    }

    render() {
        return html`
            <link rel="stylesheet" href="./main.css"/>
                
            <section>
                <div class="content-wrapper">
                    ${this.data ? html`<img class="feature" src="${this.data.asset.url}" />` : ""}

                    <div class="caption">
                        <h3>${this.data.asset.title}</h3>
                        <p>${this.data.asset.description}</p>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('photo-feature', PhotoFeature);
