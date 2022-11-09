import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const template = ({ onClick }) => (html`
  <style>
    .applepaybutton {
        background-color: black;
        border: none;
        border-image: none;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        width: 150px;
        height: 44px;
    }
    img {
        vertical-align: middle;
        height: 100%;
    }
  </style>
  <button class="applepaybutton" onClick=${onClick}>
    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDomI3gyRjsmI3gyRjt3d3cudzMub3JnJiN4MkY7MjAwMCYjeDJGO3N2ZyIgaGVpZ2h0PSI4MDAiIHdpZHRoPSIxMjAwIiB2aWV3Qm94PSItNzYuNzkxMTUgLTUyLjU1IDY2NS41MjMzIDMxNS4zIj48cGF0aCBkPSJNOTMuNTQxIDI3LjFjLTYgNy4xLTE1LjYgMTIuNy0yNS4yIDExLjktMS4yLTkuNiAzLjUtMTkuOCA5LTI2LjEgNi03LjMgMTYuNS0xMi41IDI1LTEyLjkgMSAxMC0yLjkgMTkuOC04LjggMjcuMW04LjcgMTMuOGMtMTMuOS0uOC0yNS44IDcuOS0zMi40IDcuOS02LjcgMC0xNi44LTcuNS0yNy44LTcuMy0xNC4zLjItMjcuNiA4LjMtMzQuOSAyMS4yLTE1IDI1LjgtMy45IDY0IDEwLjYgODUgNy4xIDEwLjQgMTUuNiAyMS44IDI2LjggMjEuNCAxMC42LS40IDE0LjgtNi45IDI3LjYtNi45IDEyLjkgMCAxNi42IDYuOSAyNy44IDYuNyAxMS42LS4yIDE4LjktMTAuNCAyNi0yMC44IDguMS0xMS44IDExLjQtMjMuMyAxMS42LTIzLjktLjItLjItMjIuNC04LjctMjIuNi0zNC4zLS4yLTIxLjQgMTcuNS0zMS42IDE4LjMtMzIuMi0xMC0xNC44LTI1LjYtMTYuNC0zMS0xNi44bTgwLjMtMjl2MTU1LjloMjQuMnYtNTMuM2gzMy41YzMwLjYgMCA1Mi4xLTIxIDUyLjEtNTEuNHMtMjEuMS01MS4yLTUxLjMtNTEuMnptMjQuMiAyMC40aDI3LjljMjEgMCAzMyAxMS4yIDMzIDMwLjlzLTEyIDMxLTMzLjEgMzFoLTI3Ljh6bTEyOS44IDEzNi43YzE1LjIgMCAyOS4zLTcuNyAzNS43LTE5LjloLjV2MTguN2gyMi40VjkwLjJjMC0yMi41LTE4LTM3LTQ1LjctMzctMjUuNyAwLTQ0LjcgMTQuNy00NS40IDM0LjloMjEuOGMxLjgtOS42IDEwLjctMTUuOSAyMi45LTE1LjkgMTQuOCAwIDIzLjEgNi45IDIzLjEgMTkuNnY4LjZsLTMwLjIgMS44Yy0yOC4xIDEuNy00My4zIDEzLjItNDMuMyAzMy4yIDAgMjAuMiAxNS43IDMzLjYgMzguMiAzMy42em02LjUtMTguNWMtMTIuOSAwLTIxLjEtNi4yLTIxLjEtMTUuNyAwLTkuOCA3LjktMTUuNSAyMy0xNi40bDI2LjktMS43djguOGMwIDE0LjYtMTIuNCAyNS0yOC44IDI1em04MiA1OS43YzIzLjYgMCAzNC43LTkgNDQuNC0zNi4zbDQyLjUtMTE5LjJoLTI0LjZsLTI4LjUgOTIuMWgtLjVsLTI4LjUtOTIuMWgtMjUuM2w0MSAxMTMuNS0yLjIgNi45Yy0zLjcgMTEuNy05LjcgMTYuMi0yMC40IDE2LjItMS45IDAtNS42LS4yLTcuMS0uNHYxOC43YzEuNC40IDcuNC42IDkuMi42eiIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg" alt="" aria-label="Apple Pay" class="paypal-logo paypal-logo-applepay paypal-logo-color-white"></image>
  </button>
`);

export default template;