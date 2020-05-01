class CardsListComponent extends HTMLElement {
  constructor() {
    // Always call super first in constructor
		super();
		
		this.setupShadow();
		this.addCss();
	}
	
	connectedCallback() {
		this.setupCards();
	}

	setupShadow() {
    this.shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('cards-list-template');
    const templateContent = template.content;
    this.shadow.appendChild(templateContent.cloneNode(true));
  }

  addCss() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    // relative to index.html
    linkElem.setAttribute('href', 'cards-list/cards-list.css');

    // Attach the created element to the shadow dom
    this.shadow.appendChild(linkElem);
	}
	
	setupCards() {
		for (let i = 2; i <= 10; i++) {
			const newElement = document.createElement('pondus-component');
			newElement.setAttribute('pondus-id', i);
			newElement.innerHTML = `
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia repellendus id aut aliquam in nostrum officia
				corporis quam sit fuga blanditiis tempore rerum nobis, aspernatur, adipisci illo, vero et inventore.
			`;
			this.shadow.appendChild(newElement);
		}

	}
}

customElements.define('cards-list', CardsListComponent);