import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const TASKS_STORAGE_KEY = "tasks";

export async function loadTasks(): Promise<Task[]> {
  try {
    const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

    if (!storedTasks) {
      return [];
    }

    return JSON.parse(storedTasks) as Task[];
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
}