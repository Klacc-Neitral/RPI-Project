import {createElement} from '../framework/render.js'; 


function createFormAddtaskComponentTemplate() {
    return (
        `<div class="new-task-section">
            <h2>Новая задача</h2>
            <form class="add-task-form">
                <input type="text" placeholder="Название задачи...">
                <button type="submit">Добавить</button>
            </form>
        </div>`
      );
}


export default class FormAddtaskComponent {
  getTemplate() {
    return createFormAddtaskComponentTemplate();
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
