import { css, html, LitElement } from 'lit-element';
import { fetchApi } from '../lib/api.js';
import IconStyle from '../styles/IconsStyle.js';
import './LinkButton.js';

function parseSearch(str) {
    const res = {};
    str.substring(1).split('&').map(item => item.split('=')).forEach(item => {
        res[item[0]] = unescape(item[1]);
    });
    return res;
}

export class PostList extends LitElement {

    static get properties() {
        return {
            tags: { type: String },
            limit: { type: Number },
        };
    }

    static get styles() {
        return css`
            ${IconStyle}

            :host {
                display: block;
            }
            @keyframes show {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .list {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-gap: 80px 40px;
                animation: show .2s ease;
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
                grid-template-rows: auto auto auto 1fr;
            }
            .date {
                font-size: 13px;
                letter-spacing: 1px;
                margin-top: 10px;
                opacity: 0.5;
            }
            .title {
                font-family: 'Lato';
                font-weight: 400;
                font-size: 20px;
                margin: 0;
            }
            .preview {
                width: 100%;
                height: 150px;
                object-fit: cover;
                overflow: hidden;
                border-radius: 4px;
                transition: transform .2s ease-out;
                margin-bottom: 15px;
            }
            .item:hover .preview {
                transform: scale(1.03);
            }
            .description {
                margin-top: 15px;
                line-height: 1.5em;
                font-size: 14px;
            }
            .item-link {
                display: contents;
            }
            a[href] {
                color: inherit;
                text-decoration: none;
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
            .tags {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-top: 10px;
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
            .open-link {
                color: var(--accent-color, #eee);
                --background: transparent;
                --padding: 0px;
            }
        `;
    }

    constructor() {
        super();

        this.defaultLimit = 20;

        this.loaded = false;
        this.items = [];
    }

    connectedCallback() {
        super.connectedCallback();

        let tags = [];
        if(this.tags) {
            tags = this.tags.split(",");
        }

        const process = (res) => {
            return res.then(data => {
                this.items = data.posts;
                this.loaded = true;
                this.update();
            })
        }


        if(tags.length > 0) {
            process(fetchApi(`
                {
                    posts(first: ${this.limit || this.defaultLimit}, where: { 
                        AND: [
                            { tags_contains_some: [${tags.map(s => `"${s}"`).join(", ")}] },
                            { slug_not: "${parseSearch(location.search).p || ''}" }
                        ] 
                    }) {
                        title
                        excerpt
                        createdAt
                        tags
                        slug
                    }
                }
            `))
        } else {
            process(fetchApi(`
                {
                    posts(first: ${this.limit || this.defaultLimit}, where: { 
                        AND: [
                            { tags_contains_none: [] },
                            { slug_not: "${parseSearch(location.search).p || ''}" }
                        ] 
                    }) {
                        title
                        excerpt
                        createdAt
                        tags
                        slug
                    }
                }
            `))
        }
    }

    render() {
        if (this.loaded === false) {
            return html`
                <div class="placeholder">
                    <span></span>
                </div>
            `;
        } else if (this.items.length === 0) {
            return html`
                <div>
                    No results found.
                </div>
            `;
        } else {
            return html`
                <div class="list">
                    ${this.items.sort((itemA, itemB) => {
                        return new Date(itemB.createdAt) - new Date(itemA.createdAt);
                    })
                    .map(item => {
                        const date = new Date(item.createdAt);
                        return html`
                            <div class="item-link">
                                <div class="item">
                                    <h3 class="title">${item.title}</h3>
                                    <div class="date">${date.toLocaleDateString()}</div>
                                    <div class="description">${item.excerpt}</div>
                                    <link-button target="_self" class="open-link" href="/post?p=${item.slug}">Read more</link-button>
                                    <div class="tags">
                                        ${item.tags.map(tag => {
                                            return html`<a class="tag" href="/tag?t=${tag}">${tag}</a>`;
                                        })}
                                    </div>
                                </div>
                            </div>
                        `;
                    })}
                </div>
            `;
        }
    }

}

customElements.define('post-list', PostList);
