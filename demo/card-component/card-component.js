class CardComponent extends HTMLElement {
  shadow;
  randID = Math.floor(Math.random() * 1000);
  imageName = '';
  cardTitle = 'abc';

  static imageNameAttrName = 'image-name';
  static cardTitleAttrName = 'card-title';

  constructor() {
    // Always call super first in constructor
    super();
    console.log('constructor', this.randID);

    this.setupShadow();
    this.addCss();
  }

  // TODO fix why !isConnected
  connectedCallback() {
    //connectedCallback may be called once element is no longer connected,
    if (!this.hasAttribute(CardComponent.imageNameAttrName)) {
      console.error('missing ', CardComponent.imageNameAttrName);
      return;
    }

    if (!Node.isConnected) {
      console.log('not connected');
      return;
    }
    console.log('connected');
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  adoptedCallback() {
    console.log('adoptedCallback');
  }

  //called before constructor
  static get observedAttributes() {
    console.log('observedAttributes');
    return [CardComponent.imageNameAttrName, CardComponent.cardTitleAttrName];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Attributes changed: ', name, oldValue, newValue);
    if (name === CardComponent.imageNameAttrName) {
      this.imageName = this.getAttribute(CardComponent.imageNameAttrName);
      this.updateImage();
    }
    if (name === CardComponent.cardTitleAttrName) {
      this.cardTitle = this.getAttribute(CardComponent.cardTitleAttrName);
      this.updateTitle();
    }
  }

  setupShadow() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('card-template');
    const templateContent = template.content;
    const shadowRoot = this.shadow.appendChild(templateContent.cloneNode(true));
  }

  addCss() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    // relative to index.html
    linkElem.setAttribute('href', 'card-component/card-component.css');

    // Attach the created element to the shadow dom
    this.shadow.appendChild(linkElem);
  }

  updateImage() {
    const image = this.shadow.getElementById('card-img');
    image.src = 'pondus-pics/' + this.imageName;
  }

  updateTitle() {
    // can't use getElementsByClassName
    const title = this.shadow.querySelectorAll('.card-title')[0];
    title.innerHTML = this.cardTitle;
  }
}

customElements.define('card-component', CardComponent);
