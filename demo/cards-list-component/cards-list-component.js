'use strict';
class CardsListComponent extends HTMLElement {
  lastCardIndex = 0;

  constructor() {
    super();

    this.setupShadow();
  }

  connectedCallback() {
    this.setupCards();
    this.setupClickListener();
  }

  setupShadow() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('cards-list-template');
    const templateContent = template.content;
    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  setupCards() {
    // Add for card already present
    this.shadow.querySelector('card-component').addEventListener('DeleteCard', () => this.removeCard(0));

    while (this.lastCardIndex < 9) {
      this.lastCardIndex++;
      this.appendNewCard(this.lastCardIndex);
    }
  }

  appendNewCard(id) {
    const cardTitle = 'Pondus ' + (id + 1);
    const newElement = document.createElement('card-component');
    newElement.setAttribute('image-name', id + 1 + '.jpg');
    newElement.id = 'card-' + id;
    newElement.classList = 'card';
    newElement.innerHTML = `
      <span slot="title">${cardTitle}</span>
      <span slot="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia repellendus id aut aliquam in nostrum officia
        corporis quam sit fuga blanditiis tempore rerum nobis, aspernatur, adipisci illo, vero et inventore.
      </span>
			`;
    const container = this.shadow.querySelector('.cards-list');
    newElement.addEventListener('DeleteCard', () => this.removeCard(id));
    container.appendChild(newElement);
  }

  setupClickListener() {
    const button = this.shadow.getElementById('add-card-button');
    button.addEventListener('click', (e) => this.addCard());
  }

  addCard() {
    console.log('adddd');
    this.lastCardIndex++;
    this.appendNewCard(this.lastCardIndex);
  }

  removeCard(index) {
    this.shadow.getElementById('card-' + index).remove();
  }
}

customElements.define('cards-list', CardsListComponent);
