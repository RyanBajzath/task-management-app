import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { loadTasks, saveTasks } from "../storage/taskStorage";
import { Task } from "../types/task";

// Context for global task state management
type TaskContextType = {
  tasks: Task[];
  isLoading: boolean;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  advanceTaskStatus: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

type TaskProviderProps = {
  children: ReactNode;
};

export function TaskProvider({
  children,
}: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStoredTasks() {
      const storedTasks = await loadTasks();

      setTasks(storedTasks);
      setIsLoading(false);
    }

    getStoredTasks();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  function addTask(task: Task) {
    setTasks((currentTasks) => [
      ...currentTasks,
      task,
    ]);
  }

  function updateTask(updatedTask: Task) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  function advanceTaskStatus(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }

        if (task.status === "todo") {
          return {
            ...task,
            status: "doing",
          };
        }

        if (task.status === "doing") {
          return {
            ...task,
            status: "done",
          };
        }

        return task;
      })
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        addTask,
        updateTask,
        deleteTask,
        advanceTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTasks must be used inside a TaskProvider"
    );
  }

  return context;
}