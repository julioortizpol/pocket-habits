import { StyleSheet, Text, View } from "react-native";
import { TodoList } from "../../components/TodoList";

export function MonthlyTodo() {
  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
  }
});
