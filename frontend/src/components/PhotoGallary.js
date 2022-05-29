import { css, html, LitElement } from 'lit-element';

class PhotoGallary extends LitElement {

    static get styles() {
        return css`
        :host {
          margin: 60px 0;
          display: block;
  
          --transitionDuration: .25s;
        }
  
        .photos {
          position: relative;
        }
  
        .images-container {
          max-width: 100%;
          overflow: visible;
        }
  
        .images {
          display: flex;
          transform: translateX(calc(var(--view-x, 0) * -1px));
          transition: transform var(--transitionDuration) ease;
        }
  
        .arrow {
          cursor: pointer;
          position: absolute;
          top: 50%;
          left: 20px;
          transform: translate(-50%, -50%);
          opacity: 0.75;
          transition: .15s ease-out;
          padding: 60px 10px;
          border-radius: 4px;
          z-index: 1000;
        }
  
        .arrow:hover {
          opacity: 1;
        }
  
        .arrow:active {
          opacity: .9;
          transition: none;
        }
  
        .arrow.right {
          transform: translate(50%, -50%);
          left: auto;
          right: 20px;
        }
        .arrow.left svg {
          transform: rotate(-180deg);
        }
      `;
    }

    constructor() {
        super();

        this._viewPosition = 0;
        this.current = 0;
        this.nextStep = 0;
        this.swipe = -1;
        this.lastPointerX = 0;
        this.lastPointerY = 0;
        this.viewWidth = this.clientWidth;

        window.addEventListener('load', () => {
            setTimeout(() => {
              this.setAttribute('loaded', '');
              this.updateSlides();
            }, 200);
        });

        this.addEventListener('contextmenu', e => e.preventDefault());

        this.addEventListener('touchstart', this._touchstart.bind(this));
        window.addEventListener('touchend', this._touchend.bind(this));
        this.addEventListener('touchcancel', this._touchend.bind(this));
        window.addEventListener('touchmove', this._touchmove.bind(this));

        this.addEventListener('mousedown', e => {
            e.preventDefault();
            this._touchstart(e);
        });
        window.addEventListener('mouseup', this._touchend.bind(this));
        window.addEventListener('mousemove', this._touchmove.bind(this));

        let scrolling = false;

        this.addEventListener('wheel', e => {
            const deltaX = e.wheelDeltaX;

            const update = () => {
                scrolling = true;

                if (deltaX > 0) {
                    this.prev();
                } else {
                    this.next();
                }

                setTimeout(() => {
                    scrolling = false;
                }, 300);
            }

            if (!scrolling && Math.abs(deltaX) > 100) {
                update();
            }

            if(deltaX > 0) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        });
    }

    _touchmove(e) {
        if (this.swipe == -1) return;

        const deltaX = (e.touches ? e.touches[0].clientX : e.x) - this.lastPointerX;
        const deltaY = (e.touches ? e.touches[0].clientY : e.y) - this.lastPointerY;

        if (this.swipe === 0) {
            if (Math.abs(deltaX) > 10) {
                this.swipe = 1;
            } else if (Math.abs(deltaY) > 10) {
                this.swipe = 2;
            }
        }

        if (this.swipe === 1) {
            e.preventDefault();
            e.stopImmediatePropagation();

            // scroll lock
            // document.body.style.overflow = "hidden";

            this.moveView(deltaX);

            const move = -deltaX / this.viewWidth;
            if (Math.abs(move) > 0.2) {
                this.nextStep = Math.sign(move);
            }
        }
    }

    _touchstart(e = {}) {
        this.viewWidth = this.clientWidth;
        this.swipe = 0;
        this.lastPointerX = e.touches ? e.touches[0].clientX : e.x;
        this.lastPointerY = e.touches ? e.touches[0].clientY : e.y;
        this.setTransitionDuration(0);
    }

    _touchend(e) {
        this.swipe = -1;
        this.setTransitionDuration(.25);

        this.current += (this.nextStep || 0);
        this.nextStep = 0;
        this.updateSlides();

        // revert scroll lock
        document.body.style.overflow = "";
    }

    setTransitionDuration(timeInSeconds) {
        this.style.setProperty('--transitionDuration', `${timeInSeconds}s`);
    }

    setViewPosition(px) {
        this.style.setProperty('--view-x', px);
    }

    moveView(deltaPx) {
        this.setViewPosition(this._viewPosition - deltaPx);
    }

    prev() {
        this.current--;
        this.updateSlides();
    }

    next() {
        this.current++;
        this.updateSlides();
    }

    updateSlides() {
        const slidesCount = this.children.length;

        this.current = Math.min(this.current, slidesCount - 1);
        this.current = Math.max(this.current, 0);

        this._viewPosition = 0;
        for (let i = 0; i < this.current; i++) {
            const child = this.children[i];
            this._viewPosition += child.clientWidth;
        }

        const xOffset = (-this.clientWidth / 2) + (this.children[this.current].clientWidth / 2);
        this._viewPosition += xOffset;

        for (let child of this.children) {
            child.removeAttribute('current');
        }
        this.children[this.current].setAttribute('current', '');

        this.setViewPosition(this._viewPosition);
    }

    slotChangeCallback() {
        this.updateSlides();
    }

    render() {
        return html`
        <div class="photos">
          <div class="arrow left" @click="${() => this.prev()}">
            <svg width="33.163" height="56.325" viewBox="0 0 33.163 56.325">
              <path id="Path_1" data-name="Path 1" d="M325.4-457.1l21.092,21.092L325.4-414.92" transform="translate(-318.324 464.174)" fill="none" stroke="#eee" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
            </svg>
          </div>
          <div class="arrow right" @click="${() => this.next()}">
            <svg width="33.163" height="56.325" viewBox="0 0 33.163 56.325">
              <path id="Path_1" data-name="Path 1" d="M325.4-457.1l21.092,21.092L325.4-414.92" transform="translate(-318.324 464.174)" fill="none" stroke="#eee" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
            </svg>
          </div>
          <div class="images-container">
            <div class="images" id="photo-slider-view">
              <slot @slotchange="${() => this.slotChangeCallback()}"></slot>
            </div>
          </div>
        </div>
      `;
    }

}

customElements.define('photo-gallary', PhotoGallary);
