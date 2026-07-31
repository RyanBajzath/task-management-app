import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

import { useTasks } from "../../context/TaskContext";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    tasks,
    deleteTask,
    advanceTaskStatus,
  } = useTasks();

  const router = useRouter();

  const task = tasks.find((item) => item.id === id);

  function handleDeleteTask() {
    Alert.alert(
      "Delete task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTask(id);
            router.replace("/");
          },
        },
      ]
    );
  }

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-100 p-6">
        <Text className="text-lg">Task not found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100 p-6">
      <Text className="text-3xl font-bold">
        {task.title}
      </Text>

      <Text className="mt-4 text-base">
        Category: {task.category || "None"}
      </Text>

      <Text className="mt-2 text-base">
        Status: {task.status}
      </Text>

      <Text className="mt-2 text-base">
        Due date: {task.dueDate || "No due date"}
      </Text>

      <Text className="mt-6 font-semibold">
        Description
      </Text>

      <Text className="mt-2 text-slate-600">
        {task.description || "No description"}
      </Text>

      {task.status !== "done" && (
        <Pressable
          onPress={() => advanceTaskStatus(task.id)}
          className="mt-8 rounded-lg bg-emerald-600 px-4 py-3"
        >
          <Text className="text-center font-semibold text-white">
            Move to{" "}
            {task.status === "todo" ? "Doing" : "Done"}
          </Text>
        </Pressable>
      )}

      <Pressable
        onPress={() =>
          router.push(`/tasks/${task.id}/edit`)
        }
        className={`rounded-lg bg-blue-600 px-4 py-3 ${
          task.status === "done" ? "mt-8" : "mt-3"
        }`}
      >
        <Text className="text-center font-semibold text-white">
          Edit Task
        </Text>
      </Pressable>

      <Pressable
        onPress={handleDeleteTask}
        className="mt-3 rounded-lg bg-red-600 px-4 py-3"
      >
        <Text className="text-center font-semibold text-white">
          Delete Task
        </Text>
      </Pressable>
    </View>
  );
}