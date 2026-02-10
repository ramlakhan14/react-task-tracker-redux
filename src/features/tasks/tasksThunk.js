import { addTask, importTasks } from "./tasksSlice";

export const addTaskAsync = (taskData) => {
  return async (dispatch) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch(addTask(taskData));
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
};

export const loadTasksAsync = () => {
  return async (dispatch) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const stored = localStorage.getItem("tasksState");
      if (stored) {
        dispatch(importTasks(JSON.parse(stored)));
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };
};
