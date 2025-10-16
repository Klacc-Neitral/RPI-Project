import { AbstractComponent } from '../framework/view/abstract-component.js';

function createPlugComponentTemplate() {
  return `
    <div class="plug">
      <p>Нет задач</p>
    </div>
  `;
}

export default class PlugComponent extends AbstractComponent {
  get template() {
    return createPlugComponentTemplate();
  }
}
