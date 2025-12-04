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
      <View className="flex flex-1 justify-center items-center bg-white">
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    );
  }

  const filters: { key: typeof statusFilter; label: string }[] = [
    { key: "all", label: "Tất cả" },
    { key: "done", label: "Hoàn thành" },
    { key: "notdone", label: "Chưa xong" },
  ];

  return (
    <View className="flex flex-1 bg-white">
      <Text className="my-2 text-xl font-bold px-4 text-blue-900">
        Danh sách công việc
      </Text>

      <View className="px-4 gap-3 mb-2">
        <TextInput
          mode="outlined"
          label="Tìm kiếm theo tiêu đề / nội dung"
          value={search}
          onChangeText={setSearch}
        />

        <View className="flex flex-row justify-between gap-2">
          {filters.map((filter) => {
            const isActive = statusFilter === filter.key;
            return (
              <Button
                key={filter.key}
                mode={isActive ? "contained" : "outlined"}
                onPress={() => setStatusFilter(filter.key)}
                buttonColor={isActive ? "#0B6EF6" : undefined}
                textColor={isActive ? "#ffffff" : "#0B6EF6"}
                style={{ flex: 1 }}
              >
                {filter.label}
              </Button>
            );
          })}
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
