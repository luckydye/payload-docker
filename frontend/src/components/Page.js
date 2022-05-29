import './PostList.js';
import './PostNavigation.js';
import { css, html, LitElement } from 'lit-element';
import { fetchApi } from '../lib/api.js';
import { ImageShow } from './ImageShow.js';
import IconStyle from '../styles/IconsStyle.js';

function parseSearch(str) {
    const res = {};
    str.substring(1).split('&').map(item => item.split('=')).forEach(item => {
        res[item[0]] = unescape(item[1]);
    });
    return res;
}

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

function showBigImage(img) {
    const show = new ImageShow(img);
    document.body.append(show);
}


// runtime
window.addEventListener('DOMContentLoaded', onload);


export default class PageFetch extends LitElement {

    static get styles() {
        return css`
            ${IconStyle}
            
            :host {
                display: block;
                --content-width: 1000px;
                margin-bottom: 100px;
            }
            img {
                width: calc(100% + 80px);
                height: auto;
                transform: translate(-40px, 0px);
                margin: 20px 0px 20px 0;
            }
            a[href] {
                text-decoration: underline;
            }
            video {
                width: calc(100% + 50px);
                height: auto;
                margin: 20px 0;
                margin-left: -50px;
            }
            button, h1, h2, h3, h4 {
                font-family: 'Lato', sans-serif;
            }
            .paragraph h1 {
                font-size: 32px;
                padding: 0;
                font-weight: 500;
                margin: 0 0 20px 0;
            }
            .paragraph p {
                margin: 10px 0 30px 0;
            }

            /* main.css */
            
            section {
                position: relative;
                z-index: 1000;
                justify-content: center;
                align-items: center;
                width: 100%;
                overflow: visible;
                display: grid;
                grid-template-columns: 1fr auto;
                grid-gap: 50px;
                max-width: 900px;
                margin: auto;
                padding: 40px 0;
                align-items: flex-start;
            }
            section.similar-posts {
                display: block;
                margin-top: 50px;
                max-width: 1300px;
                padding: 20px 40px 40px 40px;
                box-sizing: border-box;
                border-radius: 4px;
                background: hsl(0deg 0% 9%);
            }
            .content-wrapper {
                display: flex;
                justify-content: space-between;
                flex-direction: column;
                max-width: var(--content-width);
                width: 100%;
                z-index: 10;
            }
            .excerpt {

            }
            .cover-image {
                margin: 20px 0;
            }
            .content {
                font-size: 16px;
            }
            .tagline {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 50px;
            }
            .date {
                opacity: 0.5;
                font-size: 0.8em;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .tags {
                display: flex;
                flex-wrap: wrap;
            }
            .tag {
                opacity: 0.75;
                margin-right: 10px;
                margin-bottom: 10px;
                border-radius: 6px;
                background: #333;
                color: #eee;
                padding: 4px 6px;
                font-size: 0.75em;
                font-family: 'Lato', sans-serif;
            }
            .tag[href] {
                text-decoration: none;
            }
            .tag[href]:hover {
                opacity: 0.9;
            }

            .post-navigation {
                width: 200px;
                font-family: 'Lato', sans-serif;
            }
            @media screen and (max-width: 800px) {
                .post-navigation {
                    display: none;
                }
            }
        `;
    }

    constructor() {
        super();

        this.pageData = {};

        const params = parseSearch(location.search);

        preload(`
            {
                post(where: { slug: "${params.p}" }) {
                    title
                    createdAt
                    excerpt
                    coverImage {
                        url
                    }
                    tags
                    content {
                        html
                    }
                }
            }
        `, data => {
            this.postData = data.post;
            this.update();
            this.dispatchEvent(new Event('load'));

            document.title += " - " + this.postData.title;
            document.querySelector('meta[name="twitter:title"]').setAttribute('content', this.postData.title);
            document.querySelector('meta[name="twitter:description"]').setAttribute('content', this.postData.excerpt);

            document.querySelector('meta[property="og:url"]').setAttribute('content', location.href);
            document.querySelector('meta[property="og:title"]').setAttribute('content', this.postData.title);
            document.querySelector('meta[property="og:description"]').setAttribute('content', this.postData.excerpt);

            setTimeout(() => {
                const loader = document.querySelector('loading-placeholder');
                loader.remove();
            }, 300);

            document.querySelector('main').removeAttribute('loading');

            // this.shadowRoot.querySelectorAll('img[src]').forEach(img => {
            //     img.addEventListener('click', e => {
            //         showBigImage(img);
            //     })
            // })
        })
    }

    render() {
        const frag = document.createRange().createContextualFragment(`${this.postData.content.html}`);

        const date = new Date(this.postData.createdAt);

        return html`
            <link rel="stylesheet" href="./main.css"/>
                
            <section>
                <div class="content-wrapper paragraph">
                    <h1>${this.postData.title}</h1>
                    <div class="tagline">
                        <div class="date">
                            ${date.toLocaleDateString().replaceAll(".", " / ")}
                        </div>
                        <div class="tags">
                            ${this.postData.tags.map(tag => {
                                return html`<a class="tag" href="/tag?t=${tag}">${tag}</a>`;
                            })}
                        </div>
                    </div>
                    <div class="excerpt">
                        ${this.postData.excerpt}
                    </div>
                    ${this.postData.coverImage != null ? html`
                        <div class="cover-image">
                            <img src="${this.postData.coverImage.url}" width="100%"/>
                        </div>
                    ` : ""}
                    <div class="content">
                        ${frag}
                    </div>
                </div>
                <div class="post-navigation">
                    <post-navigation .root="${this.shadowRoot}"></post-navigation>
                </div>
            </section>

            <section class="similar-posts">
                <h4>Similar posts</h4>
                <br/>
                <post-list limit="3" tags="${this.postData.tags.join(",")}"></post-list>
            </section>
        `;
    }
}

customElements.define('page-fetch', PageFetch);