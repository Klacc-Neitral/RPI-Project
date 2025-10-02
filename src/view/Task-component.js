import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `<div class="task-item">Выучить JS</div>`
      );
}


export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
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
