'use strict';
class CardComponent extends HTMLElement {
  shadow; //components "document" element
  imageName = '';

  static imageNameAttrName = 'image-name';

  constructor() {
    // Always call super first in constructor
    super();
    console.log('CardComponent constructor')

    this.setupShadow();
    // this.addCssDynamic();
  }

  connectedCallback() {
    console.log('CardComponent connected');
    this.setupClickListener();
  }

  disconnectedCallback() {
    console.log('CardComponent disconnected');
    const button = this.shadow.getElementById('remove-button');
    button.removeEventListener('click', (e) => this.cardClicked());
  }

  adoptedCallback() {
    console.log('CardComponent adoptedCallback');
  }

  //called before constructor
  static get observedAttributes() {
    console.log('CardComponent observedAttributes');
    return [CardComponent.imageNameAttrName];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('CardComponent Attributes changed: ', name, oldValue, newValue);
    if (name === CardComponent.imageNameAttrName) {
      this.imageName = this.getAttribute(CardComponent.imageNameAttrName);
      this.updateImage();
    }
  }

  setupShadow() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('card-template');
    const templateContent = template.content;
    const shadowRoot = this.shadow.appendChild(templateContent.cloneNode(true));
  }

  addCssDynamic() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    // relative to index.html
    linkElem.setAttribute('href', 'card-component/card-component.css');

    // Attach the created element to the shadow dom
    this.shadow.appendChild(linkElem);
  }

  setupClickListener() {
    const button = this.shadow.getElementById('remove-button');
    button.addEventListener('click', (e) => this.cardClicked());
  }

  cardClicked() {
    console.log('clicked!', this.cardTitle);
    var event = new Event('DeleteCard');
    this.dispatchEvent(event); // not on shadow, but on this root element
  }

  updateImage() {
    const image = this.shadow.getElementById('card-img');
    image.src = 'pondus-pics/' + this.imageName;
  }
}

customElements.define('card-component', CardComponent);
