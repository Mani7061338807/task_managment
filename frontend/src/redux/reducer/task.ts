import { Task } from "@/interface/task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StatusCategory = {
  [key: string]: Task[];
};

interface TaskState {
  tasks: Task[];
  categorizedTasks: StatusCategory;
}

const initialState: TaskState = {
  tasks: [],
  categorizedTasks: {
    "To do": [],
    "In progress": [],
    completed: [],
    "Under review": [],
  },
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.categorizedTasks = action.payload?.reduce(
        (acc: StatusCategory, task: Task) => {
          if (!acc[task.status]) {
            acc[task.status] = [];
          }
          acc[task.status].push(task);
          return acc;
        },
        {}
      );
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; newStatus: string }>
    ) => {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task._id === taskId);

      if (task) {
        task.status = newStatus;
        state.categorizedTasks = state.tasks.reduce(
          (acc: StatusCategory, task: Task) => {
            if (!acc[task.status]) {
              acc[task.status] = [];
            }
            acc[task.status].push(task);
            return acc;
          },
          {}
        );
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
      state.categorizedTasks = state.tasks.reduce(
        (acc: StatusCategory, task: Task) => {
          if (!acc[task.status]) {
            acc[task.status] = [];
          }
          acc[task.status].push(task);
          return acc;
        },
        {}
      );
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const newTask = action.payload;
      state.tasks.push(newTask);
      if (!state.categorizedTasks[newTask.status]) {
        state.categorizedTasks[newTask.status] = [];
      }
      state.categorizedTasks[newTask.status].push(newTask);
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        updatedTask: { updatedTask: Task };
      }>
    ) => {
      const { taskId, updatedTask } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task._id === taskId);

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask.updatedTask;

        // Re-categorize tasks
        state.categorizedTasks = state.tasks.reduce(
          (acc: StatusCategory, task: Task) => {
            if (!acc[task.status]) {
              acc[task.status] = [];
            }
            acc[task.status].push(task);
            return acc;
          },
          {}
        );
      }
    },
  },
});

export const { setTasks, updateTaskStatus, deleteTask, addTask, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
