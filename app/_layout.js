import { Text } from "react-native";
import { Stack } from "expo-router";
import "../global.css";

export default function Layout() {

    return (
            <Stack 
            screenOptions={{
                headerStyle: { backgroundColor: "#7e22ce" },
                headerTitle: () => (
                    <Text className="font-bold text-3xl text-center">Portfolio Tracker</Text>
                ),
            }}
            />
    );
}