import { css } from "lit-element";

export default css`
  /* Corner box voll toll */

  .corner-box {
    --border-color: #eee;
    --corner-height: 10px;
    --corner-width: 10px;
    --border-width: 1px;
    --border-left-width: 4px;
    position: relative;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - var(--corner-height)),
      calc(100% - var(--corner-width)) 100%,
      0 100%
    );
  }

  .corner-box::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
    background: var(--border-color);
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - var(--corner-height)),
      calc(100% - var(--corner-width)) 100%,
      0 100%,
      0 calc(100% - var(--border-width)),
      var(--border-width) calc(100% - var(--border-width)),
      calc(100% - var(--corner-width) - (var(--border-width) / 2))
        calc(100% - var(--border-width)),
      calc(100% - var(--border-width))
        calc(100% - var(--corner-height) - (var(--border-width) / 2)),
      calc(100% - var(--border-width)) var(--border-width),
      var(--border-left-width) var(--border-width),
      var(--border-left-width) calc(100% - var(--border-width)),
      0 calc(100% - var(--border-width))
    );
  }

  /* filled box */

  .filled-box {
    padding: 10px 14px;
    background: #eee;
    color: #333;
    font-weight: 900;
    text-transform: uppercase;
    font-family: "Lato", sans-serif;
    letter-spacing: 1px;
    --corner-width: 8px;
    --corner-height: 8px;
    clip-path: polygon(
      var(--corner-width) 0,
      100% 0,
      100% 100%,
      0 100%,
      0 var(--corner-height)
    );
  }
`;
