import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/FormAddTask-component.js';
import {render, RenderPosition} from './framework/render.js';
import TasksModel from './model/task-model.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TasksApiService from './tasks-api-service.js';

const headerContainer = document.querySelector('.app-container');
const addTaskFormContainer = document.querySelector('.new-task-section');
const END_POINT = 'https://69023d94b208b24affe59559.mockapi.io';

const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});

const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: headerContainer,
  tasksModel
});

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick(event) {
    event.preventDefault();
    taskBoardPresenter.createTask();
}

render(new HeaderComponent(), headerContainer, RenderPosition.BEFOREBEGIN);
render(formAddTaskComponent, addTaskFormContainer);

taskBoardPresenter.init();
