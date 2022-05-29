import { css, html, LitElement } from 'lit-element';

export default class HTMLWindowElement extends LitElement {

    static get styles() {
        return css`
            :host {
                pointer-events: none;
            }
            @keyframes slidein {
                from {
                    opacity: 0;
                    transform: scale(0.95);
                }
            }
            .window {
                pointer-events: all;
                position: fixed;
                top: calc(var(--y, 10) * 1px);
                left: calc(var(--x, 10) * 1px);
                background: rgb(28, 28, 28);
                border-radius: 4px;
                overflow: hidden;
                min-width: 200px;
                min-height: 100px;
                border: 1px solid rgb(72, 72, 72) !important;
                box-shadow: rgb(0 0 0 / 33%) 1px 2px 12px !important;
                z-index: 100000000000000;
                animation: slidein .125s ease backwards;
            }
            .menubar {
                width: 100%;
                height: 20px;
                background: rgb(51, 51, 51);
                padding: 2px 4px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 11px;
                user-select: none;
                border-bottom: 1px solid #383838;
            }
            .title {
                opacity: 0.65;
                color: rgb(238, 238, 238);
            }
            .body {
                white-space: pre;
                color: rgb(238, 238, 238);
                position: relative;
                width: 400px;
                height: 700px;
            }
            iframe {
                border: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .close-btn {
                border-radius: 100%;
                background: grey;
                width: 14px;
                height: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: #333;
            }
            .close-btn:hover {
                background: darkgrey;
            }
            .close-btn:active {
                background: black;
            }
        `;
    }

    constructor(text, title = "") {
        super();
        this.title = title;
        this.text = text;
        this.x = (window.innerWidth / 2) - 200;
        this.y = Math.max((window.innerHeight / 2) - 350, 10);
    }
    connectedCallback() {
        super.connectedCallback();
        
        this.style.setProperty('--x', this.x);
        this.style.setProperty('--y', this.y);

        setTimeout(() => {
            dragElement(this.shadowRoot.querySelector('.menubar'), state => {
                this.x += state.delta[0];
                this.style.setProperty('--x', this.x);
                this.y += state.delta[1];
                this.style.setProperty('--y', this.y);
            });
        }, 100);
    }
    render() {
        return html`
            <div class="window">
                <div class="menubar">
                    <div class="title">${this.title}</div>
                    <div class="close-btn" @click="${() => this.remove()}">X</div>
                </div>
                <div class="body">${this.text}</div>
            </div>
        `;
    }
}

customElements.define('custom-window-element', HTMLWindowElement)


function dragElement(ele, callback) {
    let lastEvent;
    let downEvent;
    let dragging = false;
    let state = {};
    let pointers = {};
    let currPointer;
    ele.addEventListener('pointerdown', function (e) {
        pointers[e.pointerId] = e;
        if (!currPointer) {
            dragging = true;
            downEvent = e;
            currPointer = e.pointerId;
            state = {
                button: e.button,
                x: e.x,
                y: e.y,
                delta: [0, 0],
                absolute: [0, 0],
                mousedown: true,
                mouseup: false,
                target: e.target,
                ctrlKey: e.ctrlKey,
                altKey: e.altKey,
                shiftKey: e.shiftKey,
                pressure: 1.0,
                pointerId: null,
                type: ""
            };
        }
        callback(state);
    });
    window.addEventListener('pointerup', function (e) {
        currPointer = null;
        downEvent = null;
        lastEvent = null;
        if (dragging) {
            state.x = e.x;
            state.y = e.y;
            state.mousedown = false;
            state.mouseup = true;
            state.target = e.target;
            callback(state);
        }
        dragging = false;
        delete pointers[e.pointerId];
    });
    window.addEventListener('pointermove', function (e) {
        if (e.pointerId == currPointer) {
            if (dragging && downEvent && lastEvent) {
                state.x = e.x;
                state.y = e.y;
                state.delta = [
                    e.x - lastEvent.x,
                    e.y - lastEvent.y
                ];
                state.absolute = [
                    downEvent.x - e.x,
                    downEvent.y - e.y
                ];
                state.mousedown = false;
                state.mouseup = false;
                state.target = e.target;
                state.ctrlKey = e.ctrlKey;
                state.altKey = e.altKey;
                state.shiftKey = e.shiftKey;
                state.pressure = e.pressure;
                state.type = e.pointerType;
                state.pointerId = e.pointerId;
                callback(state);
            }
            lastEvent = e;
        }
    });
}
