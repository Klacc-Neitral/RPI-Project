import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/FormAddTask-component.js';
import ListTaskComponent from './view/Listtask-component.js';
import TaskComponent from './view/Task-component.js';
import TaskBoardComponent from './view/DeskTask-component.js'; 
import {render, RenderPosition} from './framework/render.js';

const headerContainer = document.querySelector('.app-container');
const addTaskFormContainer = document.querySelector('.new-task-section');

const taskBoardComponent = new TaskBoardComponent();

render(new HeaderComponent(), headerContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), addTaskFormContainer, RenderPosition.AFTERBEGIN);
render(taskBoardComponent, headerContainer, RenderPosition.BEFOREEND);

for (let j = 0; j < 4; j++) {
  const taskListComponent = new ListTaskComponent();

  render(taskListComponent, taskBoardComponent.getElement());

  for (let i = 0; i < 4; i++) {
    const wrapper = taskListComponent.getElement().querySelector('.tasks-wrapper');
    render(new TaskComponent(), wrapper, RenderPosition.BEFOREEND);
  }
}
