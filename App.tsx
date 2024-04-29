import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DailyTodo } from "./screens/Daily";
import { MonthlyTodo } from "./screens/Monthly";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any =
              route.name === "Daily Todo" ? "calendar-today" : "calendar-month";
            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons name={iconName} size={24} color="#000" />
            );
          },
        })}
      >
        <Tab.Screen name="Daily Todo" component={DailyTodo} />
        <Tab.Screen name="Month Todo" component={MonthlyTodo} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
