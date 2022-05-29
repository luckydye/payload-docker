import { css, html, LitElement } from 'lit-element';
import { fetchApi } from '../lib/api.js';
import { ImageShow } from './ImageShow.js';

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

function showBigImage(img) {
    const show = new ImageShow(img);
    document.body.append(show);
}


// runtime
window.addEventListener('DOMContentLoaded', onload);


export default class ImageGallary extends LitElement {

    static get styles() {
        return css`
            :host {
                margin: 40px 0;
                display: block;
            }
            .grid {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-gap: 20px;
                padding: 0;
                box-sizing: border-box;
            }
            .column {
                
            }
            .grid img {
                width: 100%;
                background: black;
                display: block;
                margin-bottom: 20px;
                cursor: pointer;
            }
            .grid img:active {
                transform: scale(0.995);
            }
            .content-wrapper {
                margin-left: 20px;
                margin-right: 20px;
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
                gallary(where: { gallaryId: "${this.slug}" }) {
                    title
                    gallaryId
                    images {
                        url
                    }
                }
            }
        `, data => {
            this.data = data;
            this.update();
            this.dispatchEvent(new Event('load'));
        })
    }

    render() {
        const columns = 4;

        return html`
            <link rel="stylesheet" href="./main.css"/>
                
            <section>
                <div class="content-wrapper">
                    <div class="grid">
                        <div class="column">
                            ${this.data ? this.data.gallary.images.map((img, i) => {
                                if(i % columns === 0) {
                                    return html`<img src="${img.url}" @click="${e => showBigImage(e.target)}"/>`; 
                                }
                            }) : ""}
                        </div>
                        <div class="column">
                            ${this.data ? this.data.gallary.images.map((img, i) => {
                                if(i % columns === 1) {
                                    return html`<img src="${img.url}" @click="${e => showBigImage(e.target)}"/>`; 
                                }
                            }) : ""}
                        </div>
                        <div class="column">
                            ${this.data ? this.data.gallary.images.map((img, i) => {
                                if(i % columns === 2) {
                                    return html`<img src="${img.url}" @click="${e => showBigImage(e.target)}"/>`; 
                                }
                            }) : ""}
                        </div>
                        <div class="column">
                            ${this.data ? this.data.gallary.images.map((img, i) => {
                                if(i % columns === 3) {
                                    return html`<img src="${img.url}" @click="${e => showBigImage(e.target)}"/>`; 
                                }
                            }) : ""}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}

customElements.define('image-gallary', ImageGallary);