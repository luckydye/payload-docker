import { css, html, LitElement } from 'lit-element';

export default class  extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    constructor() {
        super();

    }

    connectedCallback() {
        super.connectedCallback();
    }

    render() {
        return html`
            <div></div>
        `;
    }
}

customElements.define('', );