import { makeAutoObservable } from "mobx";

type taskType = {
  id: number;
  done: boolean;
  text: string;
};

export class Todo {
  toDoList: taskType[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  add(task: taskType) {
    this.toDoList.unshift(task);
  }
  remove(id: number) {
    this.toDoList = this.toDoList.filter((task) => task.id !== id);
  }
  done(id: number) {
    this.toDoList = this.toDoList.map((task) => {
      if (task.id === id) task.done = true;
      return task;
    });
  }
  undone(id: number) {
    this.toDoList = this.toDoList.map((task) => {
      if (task.id === id) task.done = false;
      return task;
    });
  }
}

export default new Todo();
