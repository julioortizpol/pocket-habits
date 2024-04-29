// components/TodoList.js
import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import TodoItem from "./Components/TodoItem";

type Props = {
  todo: Task[];
};
type Task = {
  id: number;
  title: string;
  done: boolean;
};

export function TodoList({ todo }: Props) {
  // State Hooks
  const [tasks, setTasks] = useState(todo);
  // Function to Toggle Task Completion
  function toggleCompleted(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }
  // Render TodoList Component
  return (
    <View>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleCompleted={() => toggleCompleted(task.id)}
        />
      ))}
    </View>
  );
}
