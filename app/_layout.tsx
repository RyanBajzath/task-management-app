import "../global.css";

import { Stack } from "expo-router";
import { TaskProvider } from "../context/TaskContext";

// Root layout - wraps app with task context provider
export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "Tasks" }}
        />

        <Stack.Screen
          name="tasks/new"
          options={{ title: "Create Task" }}
        />

        <Stack.Screen
          name="tasks/[id]"
          options={{ title: "Task Details" }}
        />

        <Stack.Screen
          name="tasks/[id]/edit"
          options={{ title: "Edit Task" }}
        />
      </Stack>
    </TaskProvider>
  );
}