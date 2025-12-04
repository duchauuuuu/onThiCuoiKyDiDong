import { View, Text } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";
import { Todo } from "@/core/types";
import { remove, useAppDispatch } from "@/core/store";
import { useFetch } from "@/core/useFetch";
import { useRouter } from "expo-router";

type Props = {
  data: Todo;
};

const TodoItem = ({ data }: Props) => {
  const { DEL } = useFetch("https://68e67be521dd31f22cc5d844.mockapi.io/");

  const useDispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = () => {
    DEL(`/todos/${data.id}`).then(() => useDispatch(remove(data.id)));
  };

  return (
    <View className="w-full px-4 my-2">
      <Card
        mode="contained"
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
        }}
      >
        <Card.Title title={data.title}></Card.Title>
        <Card.Content>
          <Text>Nội dung: {data.content}</Text>
          <Text>Trạng thái: {data.isDone ? "Hoàn thành" : "Chưa xong"}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleDelete}>
            Xóa
          </Button>
          <Button
            mode="contained"
            onPress={() => router.push(`/home/form?id=${data.id}`)}
          >
            Sửa
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default TodoItem;
