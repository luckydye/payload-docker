import "./components/Page.js";
import "./components/GallaryGrid.js";
import "./components/PhotoFeature.js";
import "./components/VideoFeature.js";
import "./components/InlinePost.js";
import "./components/TaggedPostList.js";

function finish() {
  setTimeout(() => {
    const loader = document.querySelector("loading-placeholder");
    if (loader) {
      loader.remove();
    }
  }, 300);
  document.querySelector("main").removeAttribute("loading");
}

window.addEventListener("scroll", (e) => {
  document.body.style.setProperty("--scroll", window.scrollY + "px");
});

window.addEventListener("load", () => {
  setTimeout(() => finish(), 150);
});
