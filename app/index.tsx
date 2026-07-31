import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useTasks } from "../context/TaskContext";

type FilterStatus = "all" | "todo" | "doing" | "done";

export default function HomeScreen() {
  const { tasks, isLoading } = useTasks();
  const router = useRouter();

  const [filter, setFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === "all" || task.status === filter;

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return matchesStatus && matchesSearch;
  });

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

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search tasks by title"
        className="mb-6 rounded-lg border border-slate-300 bg-white px-4 py-3"
      />

      <Text className="mb-2 font-semibold">
        Filter by status
      </Text>

      <View className="mb-6 flex-row gap-2">
        {(["all", "todo", "doing", "done"] as const).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setFilter(item)}
              className={`rounded-lg px-3 py-2 ${
                filter === item
                  ? "bg-blue-600"
                  : "bg-white"
              }`}
            >
              <Text
                className={
                  filter === item
                    ? "font-semibold text-white"
                    : "font-semibold text-slate-700"
                }
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {filteredTasks.length === 0 ? (
        <Text className="text-center text-slate-500">
          No tasks found.
        </Text>
      ) : (
        filteredTasks.map((task) => (
          <Pressable
            key={task.id}
            onPress={() => router.push(`/tasks/${task.id}`)}
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
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}