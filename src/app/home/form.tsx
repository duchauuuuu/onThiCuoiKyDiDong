import { View, Text } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Todo } from "@/core/types";
import { add, update, useAppDispatch, useAppSelector } from "@/core/store";
import { Button, RadioButton, TextInput } from "react-native-paper";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useFetch } from "@/core/useFetch";

const FormPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    content: "",
    isDone: false,
  } as Todo);

  const { POST, GET, PUT } = useFetch(
    "https://68e67be521dd31f22cc5d844.mockapi.io/"
  );

  const useDispatch = useAppDispatch();
  const router = useRouter();
  const navigation = useNavigation();

  const titleRef = useRef<TextInput | null>(null);
  const contentRef = useRef<TextInput | null>(null);

  useEffect(() => {
    (navigation as any).setOptions({
      title: id ? "Cập nhật công việc" : "Thêm công việc",
    });
  }, [id, navigation]);

  useFocusEffect(
    useCallback(() => {
      if (id) {
        GET<Todo>(`/todos/${id}`).then((res) => setFormData(res));
      }

      return () => {
        setFormData({
          id: "",
          title: "",
          content: "",
          isDone: false,
        } as Todo);
        (navigation as any).setParams({ id: undefined });
      };
    }, [id])
  );

  const resetForm = useCallback(() => {
    setFormData({
      id: "",
      title: "",
      content: "",
      isDone: false,
    } as Todo);
    titleRef.current?.clear();
    contentRef.current?.clear();
  }, []);

  const handleSubmit = useCallback(() => {
    if (id)
      PUT(`/todos/${id}`, formData).then(() => useDispatch(update(formData)));
    else POST("/todos", formData).then(() => useDispatch(add(formData)));

    resetForm();
    router.push("/home");
  }, [PUT, POST, add, update, formData, id, resetForm, router, useDispatch]);

  return (
    <View className="flex flex-1 justify-center items-center">
      <View className="w-full px-4 gap-4">
        <Text className="my-2 text-xl font-bold">Thông tin chung</Text>
        <TextInput
          ref={titleRef}
          label={"Tiêu đề"}
          value={formData.title}
          onChangeText={(value) => setFormData({ ...formData, title: value })}
        />
        <TextInput
          ref={contentRef}
          label={"Nội dung"}
          value={formData.content}
          onChangeText={(value) => setFormData({ ...formData, content: value })}
        />
        <Text className="my-2 text-xl font-bold">Trạng thái</Text>
        <RadioButton.Group
          value={formData.isDone ? "1" : "0"}
          onValueChange={(value) =>
            setFormData({ ...formData, isDone: value === "1" })
          }
        >
          <RadioButton.Item label="Hoàn thành" value="1"></RadioButton.Item>
          <RadioButton.Item
            label="Chưa hoàn thành"
            value="0"
          ></RadioButton.Item>
        </RadioButton.Group>

        <View className="flex flex-row justify-between gap-4 mt-2">
          <Button mode="outlined" onPress={resetForm} style={{ flex: 1 }}>
            Xóa form
          </Button>
          <Button mode="contained" onPress={handleSubmit} style={{ flex: 1 }}>
            Lưu
          </Button>
        </View>
      </View>
    </View>
  );
};

export default FormPage;
