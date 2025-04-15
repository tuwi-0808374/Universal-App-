import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Tabslayout() {
  return (
        <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d',
            headerStyle: {
            backgroundColor: '#25292e',
            },
            headerShadowVisible: false,
            headerTintColor: '#fff',
            tabBarStyle: {
            backgroundColor: '#25292e',
            },
        }}
        >
      <Tabs.Screen name="index" options={{ 
        title: 'Home', 
        tabBarIcon: ({focused, color}) => <Ionicons name={focused ? "skull-sharp" : "skull-outline"} size={30} color={color}></Ionicons> }} />
      <Tabs.Screen name="about" options={{ 
        title: 'About', 
        tabBarIcon: ({focused, color}) => <Ionicons name={focused ? "heart-sharp" : "heart-outline"} size={30} color={color}></Ionicons> }} />
    </Tabs>
  );
}
