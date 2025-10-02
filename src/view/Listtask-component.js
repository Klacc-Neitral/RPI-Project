import {createElement} from '../framework/render.js'; 


function createTaskListComponentTemplate(className, label) {
  return `
    <div class="task-column">
      <div class="status-label status-${className}">${label}</div>
      <div class="tasks-wrapper"></div>
    </div>
  `;
}


export default class ListTaskComponent {
    constructor(className, label) {
        this.className = className;
        this.label = label;
    }

    getTemplate() {
        return createTaskListComponentTemplate(this.className, this.label);
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
