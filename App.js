import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import "./global.css"

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar style="auto" />
      <Text className="text-black">Open up App.js to start working on your app!</Text>
    </View>
  );
}
