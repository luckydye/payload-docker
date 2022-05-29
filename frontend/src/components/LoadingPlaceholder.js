import { css, html, LitElement } from 'lit-element';

export default class Loader extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }
            .loader {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `;
    }

    constructor() {
        super();

        this.loaded = false;
        console.log('loading');
    }

    connectedCallback() {
        super.connectedCallback();

        for(let child of this.children) {
            child.addEventListener('load', e => {
                this.loaded = true;
                this.update();
                console.log('loaded');
            })
        }
    }

    render() {
        if(!this.loaded) {
            return html`
                <div class="loader">
                    <loading-anim></loading-anim>
                </div>
            `;
        } else {
            return html`
                <slot></slot>
            `;
        }
    }
}

customElements.define('loading-placeholder', Loader);