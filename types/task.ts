// Task workflow states
export type TaskStatus = "todo" | "doing" | "done";

// Task data model
export interface Task {
  id: string;
  title: string;
  category: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}