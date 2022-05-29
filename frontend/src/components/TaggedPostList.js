import './PostList.js';
import { css, html, LitElement } from 'lit-element';

function parseSearch(str) {
    const res = {};
    str.substring(1).split('&').map(item => item.split('=')).forEach(item => {
        res[item[0]] = unescape(item[1]);
    });
    return res;
}

export default class PageFetch extends LitElement {

    constructor() {
        super();
        
    }

    render() {
        const tag = parseSearch(location.search).t;
        return html`
            <h3>Posts tagged with "${tag}"</h3>
            <br/>
            <post-list tags="${[tag]}"></post-list>
        `;
    }
}

customElements.define('post-tag-list', PageFetch);