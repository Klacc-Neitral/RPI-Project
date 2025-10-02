import {createElement} from '../framework/render.js'; 


function createListTaskComponentTemplate() {
  return `
    <div class="task-column">
      <div class="status-label status-backlog">Бэклог</div>
      <div class="tasks-wrapper"></div>
    </div>
  `;
}


export default class ListTaskComponent {
  getTemplate() {
    return createListTaskComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
