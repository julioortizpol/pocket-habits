// components/TodoItem.js
import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  task: { id: number; title: string; done: boolean };
  toggleCompleted: () => void;
};

export default function TodoItem({ task, toggleCompleted }: Props) {
  const iconName = task.done ? "checkbox-marked" : "checkbox-blank-outline";

  return (
    <View style={styles.todoContainer}>
      <TouchableOpacity onPress={toggleCompleted} style={styles.todo}>
        <MaterialCommunityIcons name={iconName} size={24} color="#000" />
        {/* {!task.done && <Entypo name="circle" size={32} color="black" />} */}
        <Text style={styles.todoText}>{task.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  todoText: {
    flex: 1,
    paddingHorizontal: 4,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
  },
});
