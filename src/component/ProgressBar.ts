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
    this.loadCss();
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

  loadCss() {
    const style = document.createElement("style");
    style.textContent = `
      .sb-prog-bar {
        background-color: transparent;
        border: 1px solid #999999;
        border-radius: 5rem;
        
        /*only fallback*/
        height: 100%;
        width: 100%;
      }
      
      .sb-progress {
        background-image: url('./assets/images/sushi-03-nigiri-maguro.svg'), linear-gradient(to right, rgba(255, 0, 0, 0.5), rgba(255, 165, 0, 0.5), rgba(255, 255, 0, 0.5), rgba(0, 128, 0, 0.5), rgba(0, 0, 255,0.5), rgba(238, 130, 238, 0.5));
        /*, url('../images/sushi-02-nigiri-ebi.svg'), url('../images/sushi-03-nigiri-maguro.svg'), url('../images/sushi-03-nigiri-tamago.svg');*/
        background-size: auto 100%;
        background-position: right;
        background-repeat: repeat-x, no-repeat;
        height: 100%;
        transition: width 1s;
        border-radius: 5rem;
        border: 0 solid transparent;
      }
    `;

    // Attach the created elements to the shadow dom
    this.shadow.appendChild(style);
  }
}

export default ProgressBar;
