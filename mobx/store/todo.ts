import { makeAutoObservable } from "mobx";

type taskType = {
  id: number;
  done: boolean;
  text: string;
};

export class Todo {
  tasks: taskType[] = [];

  constructor() {
    makeAutoObservable(this);
  }
  add(task: taskType) {
    this.tasks.unshift(task);
  }
  remove(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
  done(id: number) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) task.done = true;
      return task;
    });
  }
  undone(id: number) {
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) task.done = false;
      return task;
    });
  }
}

export default new Todo();
