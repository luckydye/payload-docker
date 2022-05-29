import { css, html, LitElement } from 'lit-element';

export default class VideoPlayer extends LitElement {

    static get properties() {
        return {
            src: { type: String },
            autoplay: { type: Boolean }
        };
    }

    static get styles() {
        return css`
            :host {
                display: block;
                position: relative;

                --seekbar-height: 0px;
            }
            .wrapper {
                width: 100%;
            }
            :host(:hover) .controls {
                opacity: 1;
                pointer-events: all;
            }
            video {
                width: 100%;
                pointer-events: none;
            }
            .controls {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                color: #eee;
                opacity: 0;
                pointer-events: none;
                transition: opacity .25s ease-out;
            }
            .bottom {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                padding: 15px;
                display: flex;
                margin-bottom: var(--seekbar-height);
            }
            .seekbar {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: var(--seekbar-height);
                background: grey;
            }
            .right {
                position: absolute;
                right: 15px;
                bottom: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .time {
                margin-left: 20px;
            }
            .volume {
                position: relative;
                border-radius: 500px;
                width: 10px;
                height: 100px;
                background: grey;
                overflow: hidden;
            }
            .volume::after {
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 60%;
                background: #eee;
                z-index: 1000;
            }
            .mutebutton {
                margin-top: 15px;
            }
        `;
    }

    constructor() {
        super();

        this.src = "";
    }

    render() {
        return html`
            <div class="controls">
                <div class="bottom">
                    <div class="playbutton">▶</div>
                    <div class="time">0:00 / 0:10</div>
                </div>
                <div class="right">
                    <div class="volume"></div>
                    <div class="mutebutton">🔊</div>
                </div>
                <div class="seekbar"></div>
            </div>
            <div class="wrapper">
                <video ?autoplay="${this.autoplay}" loop src="${this.src}"></video>
            </div>
        `;
    }
}

customElements.define('video-player', VideoPlayer);