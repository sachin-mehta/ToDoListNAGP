import styles from '../css/item.scss';

const template = document.createElement('template');
template.innerHTML = `
  <style>${styles.toString()}</style>
  <li>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <span>Empty</span>
    
    <button class='btn btn-secondary btn-sm'>Remove &nbsp;</button>
    
  </li> 
`;

class ListItem extends HTMLElement {
  constructor() {
    super();

    // Add a shadow DOM
    const shadowDOM = this.attachShadow({ mode: 'open' });

    // Render the template
    shadowDOM.appendChild(template.content.cloneNode(true));

    // Bindings
    this.onRemove = this.onRemove.bind(this);
    this.renderChanges = this.renderChanges.bind(this);
    this.onDoneChange = this.onDoneChange.bind(this);
  }

  // any attribute specified in the following array will automatically
  // trigger attributeChangedCallback when you modify it.
  static get observedAttributes() {
    return ['done'];
  }
  
  renderChanges() {
    const text = this.shadowRoot.querySelector('li > span');

    // done attribute
    if (this.hasAttribute('done')) {
      text.style.textDecoration = 'line-through';
    } else {
      text.style.textDecoration = 'none';
    }
  }

  // Mark: - Component lifecycle
  attributeChangedCallback(attr, oldVal, newVal) {
    this.renderChanges();
  }

  connectedCallback() {
    const shadowDOM = this.shadowRoot;

    // init list item text
    const text = shadowDOM.querySelector('li > span');
    text.innerHTML = this.innerHTML;
    text.onclick = this.onDoneChange;

    // remove button action
    const button = shadowDOM.querySelector('li > button');
    button.onclick = this.onRemove;

    this.renderChanges();
  }

  // Mark: - Actions
  onRemove() {
    this.remove();
  }

  onDoneChange() {
    this.toggleAttribute('done');    
  }
}

export default ListItem;