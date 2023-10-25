class ProgressBar extends HTMLElement {
  shadow: ShadowRoot;
  background: HTMLElement;
  progress: HTMLElement;
  progressValue: number;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML =
      '<link rel="stylesheet" href="./assets/css/progressbar.css">';

    // Create an element to add into the shadow DOM, the base
    this.background = document.createElement("div");
    this.background.setAttribute("class", "sb-prog-bar");

    this.progress = document.createElement("div");
    this.progress.setAttribute("class", "sb-progress");
    this.progress.setAttribute("style", "width: 0%");

    this.progressValue = parseInt(this.getAttribute("progress") || "50");

    this.background.appendChild(this.progress);
    this.shadow.appendChild(this.background);
  }

  connectedCallback(): void {
    setTimeout(
      () =>
        this.progress.setAttribute("style", `width: ${this.progressValue}%`),
      1
    );
  }
}

export default ProgressBar;
