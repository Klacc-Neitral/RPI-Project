import TaskListComponent from "../view/Listtask-component.js";
import TaskComponent from "../view/Task-component.js";
import TaskBoardComponent from "../view/DeskTask-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import ClearButtonComponent from "../view/clearButt-Component.js";
import PlugComponent from "../view/Plug-component.js";

export default class TaskBoardPresenter {
  #clearBtnComponent = new ClearButtonComponent({
        onClick: this.handleClearButtonClick
    });
  #boardContainer = null;
  #tasksModel = null;
  #plugComponent = new PlugComponent();

  #tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this))
  }

  init() {
    this.#renderBoard();
    }
  #renderPlugComponent(tasks, container) {
    if (tasks.length === 0) {
      render(this.#plugComponent, container);
    }
  }

  #renderClearButton(status, container, tasks) {
    if (status === Status.TRASH && tasks.length > 0) {
      const clearBtnComponent = new ClearButtonComponent({
        onClick: () => this.#handleClearTrash()
      });
      render(clearBtnComponent, container);
    }
  }

  #renderTasksList(status, container) {
      const tasksListComponent = new TaskListComponent(
          status, 
          StatusLabel[status], 
          this.#handleTaskDrop.bind(this));

      render(tasksListComponent, container)

      return tasksListComponent
  }

  createTask() {
    const taskTitle = document.querySelector('.add-task-form input').value.trim();
    if (!taskTitle) {
      return;
    }  

    this.#tasksModel.addTask(taskTitle);

    document.querySelector('.add-task-form input').value = '';
  }
  
  #renderTask(task, container) {
    const taskComponent = new TaskComponent({task});
    render(taskComponent,container);}
  
  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
          const tasksListComponent = this.#renderTasksList(status, this.#tasksBoardComponent.element)
          
          const filteredTasks = this.tasks.filter(task => task.status === status)

          this.#renderPlugComponent(filteredTasks, tasksListComponent.element);

          filteredTasks.forEach((task) => {
            this.#renderTask(task, tasksListComponent.element);
          });

          this.#renderClearButton(status, tasksListComponent.element, filteredTasks);
        });
      }
  #handleModelChange() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

  #handleClearTrash() {
  this.#tasksModel.clearBucket();
}
  get tasks() {
    return this.#tasksModel.tasks;
  }

  #handleTaskDrop(taskId, newStatus, afterTaskId) {
      this.#tasksModel.updateTaskStatus(taskId, newStatus, afterTaskId);
  }

} 
    