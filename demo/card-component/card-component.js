'use strict';
class CardComponent extends HTMLElement {
  shadow; //components "document" element
  imageName = '';
  cardTitle = 'abc';

  static imageNameAttrName = 'image-name';
  static cardTitleAttrName = 'card-title';

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
    return [CardComponent.imageNameAttrName, CardComponent.cardTitleAttrName];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('CardComponent Attributes changed: ', name, oldValue, newValue);
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
    this.dispatchEvent(event); // not on shadow, but on this
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
