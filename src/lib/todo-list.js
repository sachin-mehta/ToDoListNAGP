import styles from '../css/list.scss'

const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <style>${styles.toString()}</style>
  <div class="box-body  table-responsive">
  <ul>
    <slot>
      <p>You have nothing to do!</p>
    </slot>
  </ul>
  </div>
  <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="What to do" aria-label="What to do" aria-describedby="basic-addon2" id="new-item">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">Add</button>
  </div>
</div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();

    // Add a shadow DOM
    const shadowDOM = this.attachShadow({ mode: 'open' });   

    // render
    shadowDOM.appendChild(template.content.cloneNode(true));

    // method binding
    this.addItem = this.addItem.bind(this);
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector('button');
    button.onclick = this.addItem;
  }

  addItem() {
    const input = this.shadowRoot.querySelector('#new-item');
    const item = document.createElement('list-item');

    item.innerHTML = input.value;
    if(input.value != '')
      this.appendChild(item);
    input.value = '';
    
  }
}

export default TodoList;