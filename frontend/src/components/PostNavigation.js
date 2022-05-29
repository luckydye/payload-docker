import { css, html, LitElement } from 'lit-element';

const Ease = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: (t) => t * t * t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeInOutCubic: (t) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
}

function decodeHTML(str) {
    return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}

export class PostNvigation extends LitElement {

    static get styles() {
        return css`
            :host {
                display: block;
                margin-top: 10vh;
                font-size: 14px;
                position: relative;
                z-index: 10000;
                --y-position: 0;
            }
            .nav-container {
                padding: 20px 10px;
                transform: translate(0px, calc(var(--y-position) * 1px));
            }
            .nav-title {
                font-weight: 600;
                font-size: 1em;
                margin-bottom: 15px;
            }
            .headings {
                position: relative;
            }
            .headings::before {
                content: "";
                position: absolute;
                left: 2px;
                top: 0;
                height: calc(100% + 10px);
                width: 1px;
                background: #eee;
                opacity: 0.1;
                z-index: -1;
            }
            .item {
                margin-bottom: 10px;
                font-weight: 500;
                cursor: pointer;
                padding: 4px 0 4px 15px;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                transition: transform .1s ease-out;
                position: relative;
                opacity: 0.5;
            }
            .item:hover {
                transform: translate(2px, 0px);
                opacity: 0.75;
            }
            .item[active] {
                opacity: 1;
                transform: translate(3px, 0px);
                border-left: 1.5px solid #eee;
            }
        `;
    }

    constructor() {
        super();

        this.scrollToYOffset = 40;
        this.scrollToSpeed = 4;
        this.scrollToFixedOffset = 200;
        this.scrollElementOffset = 300;

        this.activeHeader = 0;

        this.root = document.body;
        this.h3s = [];
    }

    get titletag() {
        return this.getAttribute("titletag") || "h3";
    }
    
    get title() {
        return this.hasAttribute("label") ? this.getAttribute("label") : "Contents";
    }

    connectedCallback() {
        super.connectedCallback();
        
        window.addEventListener('scroll', e => {
            // check wich item is supposed to be active
            let index = 0;
            for(let ele of this.h3s) {
                const y = (ele.getClientRects()[0]?.y || 0) - this.scrollToYOffset;
                const eleOffset = (ele && ele.hasAttribute("titleoffset")) ? +ele.getAttribute("titleoffset") : 0;
                if(y < this.scrollToYOffset + (this.scrollElementOffset + eleOffset)) {
                    this.activeHeader = index;
                    this.update();
                } else {
                    break;
                }
                index++;
            }

            this.updatePosition();
        }, { passive: true });

        this.observer = new MutationObserver((mutations) => {
            this.update();
        });

        this.observer.observe(this.root, { 
            attributes: true, 
            childList: true, 
            characterData: true 
        });
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }

    updatePosition() {
        if(this.hasAttribute("fixed"))
            return;

        const y = window.scrollY;
        this.style.setProperty('--y-position', Math.max(0, y - this.scrollToFixedOffset));
    }

    animatedScrollTo(ele) {

        const eleOffset = (ele && ele.hasAttribute("titleoffset")) ? +ele.getAttribute("titleoffset") : 0;
        const y = (ele.getClientRects()[0]?.y - this.scrollToYOffset || -window.scrollY) - eleOffset;

        const maxScrollHeight = document.body.scrollHeight - window.innerHeight;
        const target = Math.min(y + window.scrollY, maxScrollHeight);

        const start = window.scrollY;
        const dist = target - start;

        let current = window.scrollY;

        let elapsed = 0;
        let lastTick = performance.now();

        const loop = () => {
            const currentTick = performance.now();
            const deltaTime = (currentTick - lastTick) / (1000 / this.scrollToSpeed);
            elapsed += deltaTime;
            current = start + (Ease.easeInOutCubic(elapsed) * dist);

            lastTick = currentTick;

            window.scrollTo(0, current);
            this.updatePosition();

            if(Math.abs(target - current) > 2) {
                requestAnimationFrame(loop);
            }
        }
        loop();
    }

    render() {
        if(this.root) {
            this.h3s = [...this.root.querySelectorAll(this.titletag)];

            return html`
                <div class="nav-container">
                    <div class="nav-title">${this.title}</div>
                    <div class="headings">
                        ${this.h3s.map((ele, i) => {
                            return html`
                                <div class="item" 
                                    ?active="${this.activeHeader === i}" 
                                    @click="${e => this.animatedScrollTo(ele)}">
                                    ${decodeHTML(ele.innerHTML)}
                                </div>
                            `;
                        })}
                    </div>
                </div>
            `;
        } else {
            return html``;
        }
    }

}

customElements.define('post-navigation', PostNvigation);
