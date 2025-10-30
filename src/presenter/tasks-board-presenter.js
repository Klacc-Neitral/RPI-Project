import TaskListComponent from "../view/Listtask-component.js";
import TaskComponent from "../view/Task-component.js";
import TaskBoardComponent from "../view/DeskTask-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import ClearButtonComponent from "../view/clearButt-Component.js";
import PlugComponent from "../view/Plug-component.js";
import LoadingViewComponent from "../view/loadingViewComponent.js";
import { UserAction } from "../const.js";

export default class TaskBoardPresenter {
  #clearBtnComponent = new ClearButtonComponent({
        onClick: this.handleClearButtonClick
    });
  #boardContainer = null;
  #tasksModel = null;
  #loadingComponent = null;
  #plugComponent = new PlugComponent();

  #tasksBoardComponent = new TaskBoardComponent();

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;

    this.#tasksModel.addObserver(this.#handleModelChange.bind(this))
  }

    async init() {
        this.#showLoading();
        try {
            await this.#tasksModel.init();
            this.#clearBoard();

            this.#renderBoard()
        } catch (err) {
            console.error('Ошибка при инициализации доски: ', err)
        }
        finally{
          this.#hideLoading()
        }

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

    async createTask() {
        const taskTitle = document.querySelector('.inputTask').value.trim();

        if (!taskTitle)
            return;
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('.inputTask').value = '';

        } catch (err) {
            console.error('Ошибка при создании задачи: ', err);
        }

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
    #handleModelChange(event) {
        switch (event) {
            case UserAction.LOADING_START:
                this.#showLoading();
                break;

            case UserAction.LOADING_END:
                this.#hideLoading();
                break;

            case UserAction.ADD_TASK:
            case UserAction.UPDATE_TASK:
            case UserAction.DELETE_TASK:
                this.#clearBoard();
                this.#renderBoard();
                this.#hideLoading();
                break;
        }
    }

  #clearBoard() {
        this.#tasksBoardComponent.element.innerHTML = '';
    }

  #showLoading() {
    if (!this.#loadingComponent) {
        this.#loadingComponent = new LoadingViewComponent();
        render(this.#loadingComponent, this.#boardContainer);
    }

    if (this.#tasksBoardComponent?.element) {
        this.#tasksBoardComponent.element.classList.add('hidden');
    }
}

  #hideLoading() {
    if (this.#loadingComponent) {
        this.#loadingComponent.element.remove();
        this.#loadingComponent = null;
    }

    if (this.#tasksBoardComponent?.element) {
        this.#tasksBoardComponent.element.classList.remove('hidden');
    }
  }

  #handleClearTrash() {
  this.#tasksModel.clearBucket();
}
  get tasks() {
    return this.#tasksModel.tasks;
  }

async #handleTaskDrop(taskId, newStatus) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error('Ошибка при обновлении статуса задачи: ', err);
        }
    }
}
    