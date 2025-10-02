import TaskListComponent from "../view/Listtask-component.js";
import TaskComponent from "../view/Task-component.js";
import TaskBoardComponent from "../view/DeskTask-component.js";
import { render } from "../framework/render.js";
import { Status, StatusLabel } from "../const.js";
import ClearButtonComponent from "../view/clearButt-Component.js";

export default class TaskBoardPresenter {
  #clearBtnComponent = new ClearButtonComponent();
  #boardContainer = null;
  #tasksModel = null;

  #tasksBoardComponent = new TaskBoardComponent();
  #boardTasks = [];

  constructor({ boardContainer, tasksModel }) {
    this.#boardContainer = boardContainer;
    this.#tasksModel = tasksModel;
  }

  init() {
    this.#boardTasks = [...this.#tasksModel.getTasks()];
    render(this.#tasksBoardComponent, this.#boardContainer);

    Object.values(Status).forEach((element) => {
      const tasksListComponent = new TaskListComponent(element, StatusLabel[element]);
      render(tasksListComponent, this.#tasksBoardComponent.getElement());
      const tasksWrapper = tasksListComponent.getElement().querySelector(".tasks-wrapper");
      const filteredTasks = this.#boardTasks.filter((task) => task.status === element);
      for (let j = 0; j < filteredTasks.length; j++) {
        const taskComponent = new TaskComponent({ task: filteredTasks[j] });
        render(taskComponent, tasksWrapper);
      }
      if (element === Status.TRASH) {
        render(this.#clearBtnComponent, tasksWrapper);
      }
    });
  }
}
