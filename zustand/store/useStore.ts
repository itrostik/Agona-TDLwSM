import { create } from "zustand";

interface StoreState {
  tasks: taskType[];
  add: (task: taskType) => any;
  remove: (id: number) => any;
  done: (id: number) => any;
  undone: (id: number) => any;
}

type taskType = {
  id: number;
  done: boolean;
  text: string;
};

const initialState: taskType[] = [];

export const useStore = create<StoreState>((set, getState) => ({
  tasks: initialState,
  add: (task) => {
    const { tasks } = getState();
    tasks.unshift(task);
    set({
      tasks: [...tasks],
    });
  },
  remove: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  done: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: true } : task,
      ),
    })),
  undone: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, done: false } : task,
      ),
    })),
}));
