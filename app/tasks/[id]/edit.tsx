import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useTasks } from "../../../context/TaskContext";

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask } = useTasks();
  const router = useRouter();

  const task = tasks.find((item) => item.id === id);

  const [title, setTitle] = useState(task?.title ?? "");
  const [category, setCategory] = useState(task?.category ?? "");
  const [description, setDescription] = useState(
    task?.description ?? ""
  );
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");
  const [status, setStatus] = useState<
    "todo" | "doing" | "done"
  >(task?.status ?? "todo");

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-100 p-6">
        <Text className="text-lg">Task not found.</Text>
      </View>
    );
  }

  function handleUpdateTask() {
    if (!title.trim()) {
      Alert.alert(
        "Missing title",
        "Please enter a task title."
      );
      return;
    }

    updateTask({
      id: task.id,
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      dueDate: dueDate.trim(),
      status,
    });

    router.back();
  }

  return (
    <ScrollView className="flex-1 bg-slate-100 p-6">
      <Text className="mb-4 text-2xl font-bold">
        Edit Task
      </Text>

      <Text className="mb-2 font-semibold">Title</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        className="rounded-lg border border-slate-300 bg-white px-4 py-3"
      />

      <Text className="mb-2 mt-4 font-semibold">
        Category
      </Text>

      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Enter task category"
        className="rounded-lg border border-slate-300 bg-white px-4 py-3"
      />

      <Text className="mb-2 mt-4 font-semibold">
        Description
      </Text>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
        textAlignVertical="top"
        className="min-h-28 rounded-lg border border-slate-300 bg-white px-4 py-3"
      />

      <Text className="mb-2 mt-4 font-semibold">
        Due Date
      </Text>

      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="YYYY-MM-DD"
        className="rounded-lg border border-slate-300 bg-white px-4 py-3"
      />

      <Text className="mb-2 mt-4 font-semibold">
        Status
      </Text>

      <View className="flex-row gap-2">
        {(["todo", "doing", "done"] as const).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setStatus(item)}
              className={`rounded-lg px-4 py-3 ${
                status === item
                  ? "bg-blue-600"
                  : "bg-white"
              }`}
            >
              <Text
                className={
                  status === item
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

      <Pressable
        onPress={handleUpdateTask}
        className="mb-8 mt-6 rounded-lg bg-blue-600 px-4 py-3"
      >
        <Text className="text-center font-semibold text-white">
          Save Changes
        </Text>
      </Pressable>
    </ScrollView>
  );
}