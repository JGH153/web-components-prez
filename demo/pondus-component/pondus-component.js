class PondusComponent extends HTMLElement {

	shadow;

  constructor() {
    // Always call super first in constructor
    super();

		this.setupShadow();
		this.addCss();
	}
	
	setupShadow() {
		this.shadow = this.attachShadow({ mode: "open" });
		const template = document.getElementById("pondus-component-template");
		const templateContent = template.content;
		const shadowRoot = this.shadow.appendChild(
			templateContent.cloneNode(true)
		);
	}

  addCss() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'pondus-component/pondus-component.css');

    // Attach the created element to the shadow dom
    this.shadow.appendChild(linkElem);
  }
}

customElements.define('pondus-component', PondusComponent);
