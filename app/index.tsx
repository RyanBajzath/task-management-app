import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <Text className="text-2xl font-bold text-blue-600">
        Task Management App
      </Text>

      <Text className="mt-2 text-base">
        NativeWind is working.
      </Text>
    </View>
  );
}