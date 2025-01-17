import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import TabBar from "@/components/TabBar"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

export default () => {
  return (
    <Tabs
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: (({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          )),
          sceneStyle: { backgroundColor: "rgb(20,18,25)" },
        }}
      />
      <Tabs.Screen name="movies/index" options={{
        title: "Movies",
        tabBarIcon: (({ color, size }) => (
          <Ionicons name="film" color={color} size={size} />
        )),
        sceneStyle: { backgroundColor: "rgb(20,18,25)" },
      }}
      />
      <Tabs.Screen name="tvshows/index" options={{
        title: "Shows",
        tabBarIcon: (({ color, size }) => (
          <Ionicons name="tv" color={color} size={size} />
        )),
        sceneStyle: { backgroundColor: "rgb(20,18,25)" },
      }}
      />
      <Tabs.Screen name="search/index" options={{
        title: "Search",
        tabBarIcon: (({ color, size }) => (
          <Ionicons name="search" color={color} size={size} />
        )),
        sceneStyle: { backgroundColor: "rgb(20,18,25)" },
      }}
      />
    </Tabs>
  )
}