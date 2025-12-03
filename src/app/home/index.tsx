import { View, Text, FlatList } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useFetch } from "@/core/useFetch";
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { setTodos, useAppDispatch, useAppSelector } from "@/core/store";
import { Todo } from "@/core/types";
import { useFocusEffect } from "expo-router";
import TodoItem from "@/components/TodoItem";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "done" | "notdone">(
    "all"
  );

  const { isLoading, GET } = useFetch(
    // "https://68247ed20f0188d7e7298546.mockapi.io/"
    "https://68e67be521dd31f22cc5d844.mockapi.io/"
  );

  const { todos } = useAppSelector((state) => state.todo);
  const useDispatch = useAppDispatch();

  const filteredTodos = useMemo(() => {
    return todos.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.content.toLowerCase().includes(search.toLowerCase());

      let matchStatus = true;
      if (statusFilter === "done") matchStatus = item.isDone === true;
      if (statusFilter === "notdone") matchStatus = item.isDone === false;

      return matchSearch && matchStatus;
    });
  }, [todos, search, statusFilter]);

  const handleFetch = () => {
    GET<Todo[]>("/todos").then((res) => useDispatch(setTodos(res)));
  };

  useFocusEffect(
    useCallback(() => {
      handleFetch();
    }, [])
  );

  if (isLoading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    );
  }

  return (
    <View className="flex flex-1">
      <Text className="my-2 text-xl font-bold px-4">Danh sách công việc</Text>

      <View className="px-4 gap-3 mb-2">
        <TextInput
          mode="outlined"
          label="Tìm kiếm theo tiêu đề / nội dung"
          value={search}
          onChangeText={setSearch}
        />

        <View className="flex flex-row justify-between">
          <Button
            mode={statusFilter === "all" ? "contained" : "outlined"}
            onPress={() => setStatusFilter("all")}
          >
            Tất cả
          </Button>
          <Button
            mode={statusFilter === "done" ? "contained" : "outlined"}
            onPress={() => setStatusFilter("done")}
          >
            Hoàn thành
          </Button>
          <Button
            mode={statusFilter === "notdone" ? "contained" : "outlined"}
            onPress={() => setStatusFilter("notdone")}
          >
            Chưa xong
          </Button>
        </View>
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem data={item} />}
        ListEmptyComponent={
          <View className="flex flex-1 items-center mt-10">
            <Text>Không có công việc nào phù hợp.</Text>
          </View>
        }
      />
    </View>
  );
};

export default HomePage;
