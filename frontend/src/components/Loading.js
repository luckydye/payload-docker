import { css, html, LitElement } from 'lit-element';

export default class Loading extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
            }
            img {
                display: block;
            }
        `;
    }

    render() {
        return html`
            <img src="../images/loading.gif" width="100px"/>
        `;
    }
}

customElements.define('loading-anim', Loading);