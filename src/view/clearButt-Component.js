import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonComponentTemplate() {
  return `
    <div class='btn'>   
      <button class="clear-btn">Очистить</button> 
    </div>
  `;
}

export default class ClearButtonComponent extends AbstractComponent {
  get template() {
    return createClearButtonComponentTemplate();
  }
}
