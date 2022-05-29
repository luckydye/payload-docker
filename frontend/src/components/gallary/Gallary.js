import { css, html, LitElement } from "lit-element";
import { fetchApi } from "../../lib/api.js";
import GallaryItem from "./GallaryItem.js";
import Loading from "../Loading.js";
import IconsStyle from "../../styles/IconsStyle.js";

const INITAL_PANE = 0;

export default class Gallary extends LitElement {
  static get styles() {
    return css`
      ${IconsStyle}

      :host {
        display: block;
        --transitionDuration: 0.25s;
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
    `;
  }

  constructor() {
    super();

    this.items = [];

    fetchApi(`
          {
            projects(where: { featureProject: true }, orderBy: editorialDate_DESC) {
              title
              url
              preview {
                  url
              }
              description
            }
          }
        `).then((data) => {
      this.items = data.projects;
      for (let item of this.items) {
        const img = new GallaryItem(item);
        this.append(img);
      }
      this.update();
      this.dispatchEvent(new Event("load"));
    });

    //
    this._viewPosition = 0;
    this.current = INITAL_PANE;
    this.nextStep = 0;
    this.swipe = -1;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.viewWidth = this.clientWidth;

    window.addEventListener("load", () => {
      this.updateSlides();
    });

    this.addEventListener("contextmenu", (e) => e.preventDefault());

    this.addEventListener("touchstart", this._touchstart.bind(this), {});
    window.addEventListener("touchend", this._touchend.bind(this), {});
    this.addEventListener("touchcancel", this._touchend.bind(this), {});
    window.addEventListener("touchmove", this._touchmove.bind(this), {});

    this.addEventListener("mousedown", (e) => {
      e.preventDefault();
      this._touchstart(e);
    });
    window.addEventListener("mouseup", this._touchend.bind(this), {});
    window.addEventListener("mousemove", this._touchmove.bind(this), {});
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

      if (window.innerWidth < 1500) {
        document.body.style.overflow = "hidden";
      }

      this.moveView(deltaX);

      const move = -deltaX / this.viewWidth;
      if (Math.abs(move) > 0.1) {
        this.nextStep = Math.sign(move);
      }
    }
  }

  _touchstart(e = {}) {
    if (window.innerWidth >= this.offsetWidth) {
      return;
    }

    this.viewWidth = this.clientWidth;
    this.swipe = 0;
    this.lastPointerX = e.touches ? e.touches[0].clientX : e.x;
    this.lastPointerY = e.touches ? e.touches[0].clientY : e.y;
    this.setTransitionDuration(0);
  }

  _touchend(e) {
    this.swipe = -1;
    this.setTransitionDuration(0.25);

    this.current += this.nextStep || 0;
    this.nextStep = 0;
    this.updateSlides();

    document.body.style.overflow = "";
  }

  setTransitionDuration(timeInSeconds) {
    this.style.setProperty("--transitionDuration", `${timeInSeconds}s`);
  }

  setViewPosition(px) {
    this.style.setProperty("--view-x", px);
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

    if (slidesCount < 1) return;

    this.current = Math.min(this.current, slidesCount - 1);
    this.current = Math.max(this.current, 0);

    this._viewPosition = 0;
    for (let i = 0; i < this.current; i++) {
      const child = this.children[i];
      this._viewPosition += child.clientWidth;
    }

    // center item
    // const xOffset = (-this.clientWidth / 2) + (this.children[this.current].clientWidth / 2);
    // this._viewPosition += xOffset;

    for (let child of this.children) {
      child.removeAttribute("current");
    }
    this.children[this.current].setAttribute("current", "");

    this.setViewPosition(this._viewPosition);
  }

  slotChangeCallback() {
    this.updateSlides();
  }

  render() {
    if (this.items.length === 0) {
      return html`
        <div class="placeholder">
          <loading-anim></loading-anim>
        </div>
      `;
    } else {
      return html`
        <div class="images-container">
          <div class="images">
            <slot @slotchange="${() => this.slotChangeCallback()}"></slot>
          </div>
        </div>
      `;
    }
  }
}

customElements.define("list-gallary", Gallary);
