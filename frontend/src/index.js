import { fetchApi } from "./lib/api.js";
import "./components/gallary/Gallary.js";
import "./components/ProjectList.js";
import "./components/PostNavigation.js";
import "./components/PhotoGallary.js";
import "./components/LoadingPlaceholder.js";
import "./components/VideoPlayer.js";
import "./components/PostList.js";
import "./components/TwitchNotification.js";
import Win from "./components/Window.js";

window.openUncut = () => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.top = "-1000px";
  document.body.append(iframe);
  iframe.onload = () => {
    iframe.style.position = "";
    iframe.style.top = "";
    const win = new Win(iframe);
    document.body.append(win);
    iframe.onload = null;
  };
  iframe.src = "https://uncut-projects.web.app/uncut/src/";
};

function main() {
  preload(
    `
      {
          author(where: { id: "ckq6qd3ns25mt0b57x3zov2yu" }) {
              name
              picture {
                  url
              }
              title
              biography
          }
      }
  `,
    (data) => {
      //   const ele = document.querySelector(".bio");
      //   ele.innerHTML = data.author.biography;
      //   const img = document.querySelector(".profile-image img");
      //   img.src = data.author.picture.url;
      //   ele.dispatchEvent(new Event("load"));
      //   const title = document.querySelector(".big-paragraph .title");
      //   title.innerHTML = data.author.title;

      setTimeout(() => {
        const loader = document.querySelector("loading-placeholder");
        loader.remove();
      }, 300);
      document.querySelector("main").removeAttribute("loading");
    }
  );
}

// preloading
let loaded = false;
const loadCallbacks = [];

async function preload(requestBody, callback) {
  return fetchApi(requestBody).then((data) => {
    if (!loaded) {
      loadCallbacks.push(() => {
        callback(data);
      });
    } else {
      callback(data);
    }
  });
}

function onload() {
  loaded = true;
  for (let callback of loadCallbacks) {
    callback();
  }
}

// runtime
window.addEventListener("DOMContentLoaded", onload);
main();

window.addEventListener("scroll", (e) => {
  document.body.style.setProperty("--scroll", window.scrollY + "px");
});
