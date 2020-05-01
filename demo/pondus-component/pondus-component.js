// rename to card?
class PondusComponent extends HTMLElement {
  shadow;
  randID = Math.floor(Math.random() * 1000);
  pondusId = -1;

  static pondusAttrNameStatic = 'pondus-id';
  pondusAttrName = PondusComponent.pondusAttrNameStatic;

  static get observedAttributes() {
    return [PondusComponent.pondusAttrNameStatic];
  }

  constructor() {
    // Always call super first in constructor
    super();

    console.log(this.pondusAttrName);

    this.setupShadow();
    this.addCss();
    console.log('constructor', this.randID);
  }

  connectedCallback() {
    //connectedCallback may be called once element is no longer connected,
    if (!this.hasAttribute(this.pondusAttrName)) {
      console.error('missing pondus-id');
      return;
    }

    if (!Node.isConnected) {
      console.log('not connected', this.randID);
      console.log(this.hasAttribute('pondus'));
      return;
    }
    console.log('connected');
    requestAnimationFrame(() => {
      console.log(this.pondus);
    });
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  adoptedCallback() {
    console.log('adoptedCallback');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom square element attributes changed: ', name, oldValue, newValue);
    if (name === this.pondusAttrName) {
      this.pondusId = this.getAttribute(this.pondusAttrName);
      this.updateTitle();
      this.updateImage();
    }
  }

  setupShadow() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('pondus-component-template');
    const templateContent = template.content;
    const shadowRoot = this.shadow.appendChild(templateContent.cloneNode(true));
  }

  addCss() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    // relative to index.html
    linkElem.setAttribute('href', 'pondus-component/pondus-component.css');

    // Attach the created element to the shadow dom
    this.shadow.appendChild(linkElem);
  }

  updateImage() {
    const image = this.shadow.getElementById('pondus-img');
    image.src = 'pondus-pics/' + this.pondusId + '.jpg';
  }

  updateTitle() {
		// cant use getElementsByClassName
		const title = this.shadow.querySelectorAll('.card-title')[0];
    title.innerHTML = 'Pondus ' + this.pondusId;
  }
}

customElements.define('pondus-component', PondusComponent);
