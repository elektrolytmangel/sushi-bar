class ProgressBar extends HTMLElement {
  shadow: ShadowRoot;
  background: HTMLElement;
  progress: HTMLElement;
  progressValue: number = 0;
  height: string = "100px";
  width: string = "100%";

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML =
      '<link rel="stylesheet" href="./assets/css/progressbar.css" mime-type="text/css">';

    // Create an element to add into the shadow DOM, the base
    this.background = document.createElement("div");
    this.background.setAttribute("class", "sb-prog-bar");

    this.progress = document.createElement("div");
    this.progress.setAttribute("class", "sb-progress");
    this.progress.setAttribute("style", "width: 0%");

    this.background.appendChild(this.progress);
    this.shadow.appendChild(this.background);
  }

  connectedCallback(): void {
    this.updateStyle();
  }

  attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (oldValue !== newValue) {
      this.updateStyle();
    }
  }

  updateStyle() {
    this.progressValue = parseInt(
      this.getAttribute("progress") || this.progressValue.toString()
    );
    this.width = this.getAttribute("width") ?? this.width;
    this.height = this.getAttribute("height") ?? this.height;

    setTimeout(() => {
      this.progress.setAttribute("style", `width: ${this.progressValue}%`);
      this.background.setAttribute(
        "style",
        `width: ${this.width}; height: ${this.height}`
      );
    }, 1);
  }
}

export default ProgressBar;
