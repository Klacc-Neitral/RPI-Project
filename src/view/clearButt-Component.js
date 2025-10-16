import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
  return `
    <div class='btn'>   
      <button class="clear-btn">Очистить</button> 
    </div>
  `;
}

export default class ClearButtonComponent extends AbstractComponent{
    #handleClick = null;

    constructor({onClick}) {
        super()
        this.#handleClick = onClick;
        this.element.querySelector('.clear-btn').addEventListener('click', this.#clickHandler);
    }
    

    get template() {
        return createClearButtonComponentTemplate();
    }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    }
}
