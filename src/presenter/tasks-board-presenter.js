import TaskListComponent from "../view/Listtask-component.js";
import TaskComponent from "../view/Task-component.js";
import TaskBoardComponent from "../view/DeskTask-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import ClearButtonComponent from "../view/clearButt-Component.js";
import PlugComponent from "../view/Plug-component.js";

export default class TaskBoardPresenter {
  #clearBtnComponent = new ClearButtonComponent();
  #boardContainer = null;
  #tasksModel = null;
  #plugComponent = new PlugComponent();

  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.tasks];
    this.#renderBoard();
    }
  #renderPlugComponent(tasks, container) {
    if (tasks.length === 0) {
      render(this.#plugComponent, container);
    }
  }

  #renderClearButton(status, container){
    if(status === Status.TRASH) {
      render(this.#clearBtnComponent, container);
    }
  }

  #renderTasksList(status, container){
    const tasksListComponent = new TaskListComponent(status, StatusLabel[status]);
    render (tasksListComponent, container);
    return tasksListComponent;
  }
  
  #renderTask(task, container) {
    const taskComponent = new TaskComponent({task});
    render(taskComponent,container);}
  
  #renderBoard() {
    render(this.#tasksBoardComponent, this.#boardContainer);

        Object.values(Status).forEach((status) => {
          const tasksListComponent = this.#renderTasksList(status, this.#tasksBoardComponent.element)
          
          const filteredTasks = this.#boardTasks.filter(task => task.status === status)

          this.#renderPlugComponent(filteredTasks, tasksListComponent.element);

          filteredTasks.forEach((task) => {
            this.#renderTask(task, tasksListComponent.element);
          });

          this.#renderClearButton(status, tasksListComponent.element)
        });
      }

        
          
        
  }
    