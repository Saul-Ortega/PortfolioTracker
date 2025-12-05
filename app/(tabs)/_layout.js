import { Tabs } from "expo-router"
import { PortfolioIcon, SearchIcon, ProfileIcon } from "../../components/Icons";

export default function TabsLayout() {
    return (
        <Tabs
        screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: "#FFF" },
            tabBarActiveTintColor: "#7e22ce",
        }}
        >
            <Tabs.Screen 
            name="portfolio"
            options={{
                title: "Portfolio",
                tabBarIcon: ({ color }) => <PortfolioIcon color={color} size={30} />
            }}
            />
            <Tabs.Screen 
            name="search"
            options={{
                title: "Search",
                tabBarIcon: ({ color }) => <SearchIcon color={color} size={30} />
            }}
            />
            <Tabs.Screen 
            name="user"
            options={{
                title: "User",
                tabBarIcon: ({ color }) => <ProfileIcon color={color} size={30} />
            }}
            />
        </Tabs>
    )
}