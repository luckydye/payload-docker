import { css, html, LitElement } from 'lit-element';

export default class LinkButton extends LitElement {

    static get properties() {
        return {
            href: { type: String },
            target: { type: String, default: "_self" }
        };
    }

    static get styles() {
        return css`
            :host {
                display: inline-block;
                color: black;
                --padding: 4px 10px;
                --background: var(--accent-color, #eee);
                --border-radius: 4px;
                margin-top: 15px;
                font-size: 14px;
                font-weight: 600;
            }
            .open-link[href] {
                transform-origin: 5px 0px;
                transition: transform 0.125s ease-out 0s;
                display: inline-flex;
                align-items: center;
                justify-content: flex-start;
                line-height: 100%;
                justify-self: flex-start;
                padding: var(--padding, 4px 10px);
                background: var(--background, #eee);
                color: inherit;
                border-radius: var(--border-radius);
                text-decoration: none;
            }
            .open-link:hover {
                transform: translate(1px, 0);
            }
            .open-link:active {
                transition: transform 0.01s ease-out 0s;
                transform: translate(1px, 0.5px);
            }
            .material-icons {
                margin: 0 5px;
                display: var(--display-icon, "inherit");
            }
        `;
    }

    render() {
        return html`
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css"/>

            <a target="${this.target}" rel="noreferrer" class="open-link" href="${this.href}">
                <slot></slot> <span class="material-icons">arrow_right_alt</span>
            </a>
        `;
    }
}

customElements.define('link-button', LinkButton);
