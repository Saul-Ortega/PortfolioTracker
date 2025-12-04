import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Layout() {
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1" style={{paddingTop: insets.top, paddingBottom: insets.bottom}}>
            <Stack 
            screenOptions={{
                headerStyle: { backgroundColor: "white" },
                headerTitle: "",
                headerTitle: () => (
                    <Text>Portfolio Tracker</Text>
                )
            }}
            />
        </View>
    );
}