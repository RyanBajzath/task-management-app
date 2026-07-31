import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { useTasks } from "../context/TaskContext";

export default function HomeScreen() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-100 p-6">
      <Text className="mb-2 text-3xl font-bold text-blue-600">
        My Tasks
      </Text>

      <Text className="mb-6 text-base text-slate-600">
        You have {tasks.length} tasks.
      </Text>

      <Link
        href="/tasks/new"
        className="mb-6 rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white"
      >
        Create Task
      </Link>

      {tasks.length === 0 ? (
        <Text className="text-center text-slate-500">
          No tasks yet.
        </Text>
      ) : (
        tasks.map((task) => (
          <View
            key={task.id}
            className="mb-4 rounded-lg bg-white p-4"
          >
            <Text className="text-xl font-bold">
              {task.title}
            </Text>

            <Text className="mt-1 text-slate-600">
              Category: {task.category || "None"}
            </Text>

            <Text className="mt-1 text-slate-600">
              Status: {task.status}
            </Text>

            <Text className="mt-1 text-slate-600">
              Due: {task.dueDate || "No due date"}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}