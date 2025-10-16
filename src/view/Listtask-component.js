import { AbstractComponent } from '../framework/view/abstract-component.js';



function createTaskListComponentTemplate(className, label) {
  return `
    <div class="task-column">
      <div class="status-label status-${className}">${label}</div>
      <div class="tasks-wrapper"></div>
    </div>
  `;
}


export default class ListTaskComponent extends AbstractComponent {
    constructor(className, label) {
        super()
        this.className = className;
        this.label = label;
    }

    get template() {
        return createTaskListComponentTemplate(this.className, this.label);
    }
}
