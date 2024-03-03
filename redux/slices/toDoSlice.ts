import { createSlice } from "@reduxjs/toolkit";

type taskType = {
  id: number;
  done: boolean;
  text: string;
};

const initialState: taskType[] = [];

export const toDoSlice = createSlice({
  name: "toDoSlice",
  initialState,
  reducers: {
    add: (state, action) => {
      const buffer = [...state];
      buffer.unshift(action.payload);
      state = [...buffer];
      return state;
    },
    remove: (state, action) => {
      let buffer = [...state];
      buffer = buffer.filter((task) => task.id !== action.payload);
      state = [...buffer];
      return state;
    },
    done: (state, action) => {
      let buffer = [...state];
      buffer = buffer.map((task) => {
        if (task.id === action.payload) return { ...task, done: true };

        return task;
      });
      state = [...buffer];
      return state;
    },
    undone: (state, action) => {
      let buffer = [...state];
      buffer = buffer.map((task) => {
        if (task.id === action.payload) return { ...task, done: false };
        return task;
      });
      state = [...buffer];
      return state;
    },
  },
});

export const { add, remove, done, undone } = toDoSlice.actions;

export default toDoSlice.reducer;
