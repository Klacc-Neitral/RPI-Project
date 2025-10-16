import { AbstractComponent } from '../framework/view/abstract-component.js';



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


export default class FormAddtaskComponent extends AbstractComponent {
  #handleClick = null;

  constructor({onClick}){
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#handleClick);
  }

  get template() {
    return createFormAddtaskComponentTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

}
