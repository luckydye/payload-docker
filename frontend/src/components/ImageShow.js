import { css, html, LitElement } from 'lit-element';

export class ImageShow extends LitElement {

    static get properties() {
        return {
            src: { type: String },
        };
    }

    static get styles() {
        return css`
            :host {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: block;
                z-index: 100000000;
            }
            .blackbox {
                width: 100%;
                height: 100%;
                background: rgba(0,0,0, 0.5);
                animation: fadein .25s ease;
            }
            .close-btn {
                position: absolute;
                top: 40px;
                right: 40px;
                border-radius: 50%;
                padding: 15px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
            .close-btn:hover {
                background: grey;
            }
            .close-btn:active {
                background: darkgrey;
            }
            .content {
                position: absolute;
                top: 0;
                left: 0;
                right: auto;
                bottom: auto;
                width: 600px;
                height: auto;
                transition: all .3s ease;
                -webkit-transition: all .3s ease;
            }
            .content img {
                width: 100%;
                height: auto;
            }
            @keyframes fadein {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
    }

    constructor(img) {
        super();

        this.sourceImage = img;
        this.position = null;

        if(!this.src && img != null) {
            this.src = img.src;
            this.position = img.getBoundingClientRect();
        }

        window.addEventListener('keydown', e => {
            if(e.key === "Escape") {
                this.close();
            }
        })
    }

    connectedCallback() {
        super.connectedCallback();

        this.update();

        const content = this.shadowRoot.querySelector('.content');

        content.style.width = this.position.width + "px";
        content.style.height = this.position.height + "px";
        content.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;

        const img = this.shadowRoot.querySelector('.content img');
        img.onload = () => {
            if(this.sourceImage) {
                this.sourceImage.style.opacity = 0;
                this.sourceImage.style.transition = "opacity .125s ease";
            }

            content.style.transform = `translate(calc(50vw - 50%), calc(50vh - 50%)) scale(${600 / this.position.width})`;
        }
    }

    close() {
        this.remove();

        if(this.sourceImage) {
            this.sourceImage.style.opacity = null;
        }
    }

    render() {
        return html`
            <div class="blackbox" @click="${e => {
                if(e.target.className === "blackbox") {
                    this.close();
                }
            }}">
                <div class="close-btn" @click="${e => this.close()}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 30.258 30.258"><g transform="translate(-447.371 -422.371)"><line x2="28.844" y2="28.844" transform="translate(448.078 423.078)" fill="none" stroke="#eee" stroke-width="2"/><line x1="28.844" y2="28.844" transform="translate(448.078 423.078)" fill="none" stroke="#eee" stroke-width="2"/></g></svg>
                </div>

                <div class="content">
                    <img src="${this.src}"/>
                </div>
            </div>
        `;
    }
}

customElements.define('image-show', ImageShow);
