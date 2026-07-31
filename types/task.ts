export type TaskStatus = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  category: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}