import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TodoList } from "../../components/TodoList";
import { useGetSheetsData } from "../../utils/getSheetsData";
import { getDay, getWeekOfMonth } from "../../utils/timeFunctions";
import { ReactNode, useEffect, useState } from "react";
import { removeEmptyFromArray } from "../../utils/clearEmpty";
const headerTextWeeks = "Semana";
const headerTextHabits: any = "Habitos";
const weekOfMonth: any = `${headerTextWeeks} ${getWeekOfMonth()}`;
export function DailyTodo() {
  const { allSeriesData } = useGetSheetsData();
  const [todo, setTodo] = useState<[]>();
  const [habit, setHabit] = useState<[]>();
  console.log(todo);
  useEffect(() => {
    if (allSeriesData) {
      console.log(allSeriesData);
      const weekData = allSeriesData[weekOfMonth];
      const habitData: any = allSeriesData[headerTextHabits];
      if (weekData) {
        const dayData: any = weekData[getDay()];
        const taskList = removeEmptyFromArray(dayData.split("\n"));
        const habitList = removeEmptyFromArray(habitData.split("\n"));
        setTodo(taskList);
        setHabit(habitList);
      }
    }
  }, [allSeriesData]);

  type ExpandableProps = {
    title: string;
    children: ReactNode;
    defaultState: boolean;
  };
  const ExpandableListItem = ({
    title,
    children,
    defaultState,
  }: ExpandableProps) => {
    const [expanded, setExpand] = useState<boolean>(defaultState);

    const toggleExpand = () => {
      setExpand(!expanded);
    };

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
          <Text style={styles.itemTitle}>{title}</Text>
        </TouchableOpacity>
        {expanded && children}
      </View>
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <ExpandableListItem title={"Assignment"} defaultState={true}>
          <View>
            {todo && (
              <TodoList
                todo={todo?.map((task, index) => ({
                  id: index,
                  title: task,
                  done: false,
                }))}
              />
            )}
          </View>
        </ExpandableListItem>
        <ExpandableListItem title={"Habits"} defaultState={false}>
          <View>
            {habit ? (
              <TodoList
                todo={habit?.map((task, index) => ({
                  id: index,
                  title: task,
                  done: false,
                }))}
              />
            ) : (
              <></>
            )}
          </View>
        </ExpandableListItem>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 3,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  itemTitle: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
});
