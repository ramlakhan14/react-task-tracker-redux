import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  past: [],
  present: {
    tasks: [],
    filter: "all",
    search: ""
  },
  future: []
};

const save = (state) =>
  localStorage.setItem("tasksState", JSON.stringify(state));

const tasksSlice = createSlice({
  name: "tasks",
  initialState:
    JSON.parse(localStorage.getItem("tasksState")) || initialState,
  reducers: {
    addTask(state, action) {
      state.past.push(state.present);
      state.present = {
        ...state.present,
        tasks: [
          ...state.present.tasks,
          { id: uuid(), completed: false, ...action.payload }
        ]
      };
      state.future = [];
      save(state);
    },

    toggleTask(state, action) {
      state.past.push(state.present);
      state.present = {
        ...state.present,
        tasks: state.present.tasks.map((t) =>
          t.id === action.payload
            ? { ...t, completed: !t.completed }
            : t
        )
      };
      state.future = [];
      save(state);
    },

    deleteTask(state, action) {
      state.past.push(state.present);
      state.present = {
        ...state.present,
        tasks: state.present.tasks.filter(
          (t) => t.id !== action.payload
        )
      };
      state.future = [];
      save(state);
    },

    reorderTasks(state, action) {
      state.past.push(state.present);
      state.present = {
        ...state.present,
        tasks: action.payload
      };
      state.future = [];
      save(state);
    },

    setFilter(state, action) {
      state.present.filter = action.payload;
    },

    setSearch(state, action) {
      state.present.search = action.payload;
    },

    undo(state) {
      if (!state.past.length) return;
      state.future.unshift(state.present);
      state.present = state.past.pop();
      save(state);
    },

    redo(state) {
      if (!state.future.length) return;
      state.past.push(state.present);
      state.present = state.future.shift();
      save(state);
    },

    importTasks(_, action) {
      save(action.payload);
      return action.payload;
    },
    updateTask(state, action) {
  state.past.push(state.present);
  state.present = {
    ...state.present,
    tasks: state.present.tasks.map((t) =>
      t.id === action.payload.id ? action.payload : t
    )
  };
  state.future = [];
  save(state);
}

  }
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  reorderTasks,
  setFilter,
  setSearch,
  undo,
  redo,
  importTasks,
  updateTask
} = tasksSlice.actions;

export default tasksSlice.reducer;
