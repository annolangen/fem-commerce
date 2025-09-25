import "./style.css";
import { html, render } from "lit-html";

function renderBody() {
  render(
    html,
    document.body
  );
}

renderBody();
window.onclick = window.onhashchange = renderBody;
