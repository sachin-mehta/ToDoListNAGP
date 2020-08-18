import TodoList from './lib/todo-list';
import ListItem from './lib/list-item';
import "./lib/main";
import "./css/style.css";

customElements.define('list-item', ListItem);
customElements.define('todo-list', TodoList);