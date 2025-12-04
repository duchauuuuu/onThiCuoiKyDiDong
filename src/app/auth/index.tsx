import { View } from "react-native";
import React from "react";
import { Button, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";

const AuthPage = () => {
  const router = useRouter();

  return (
    <View className="flex flex-1 justify-center items-center bg-white">
      <View className="w-full px-4 gap-4">
        <TextInput mode="outlined" label={"Họ tên"} value="Nguyen Duc Hau" />
        <TextInput mode="outlined" label={"Lớp học"} value="DHKTPM18ATT" />
        <TextInput mode="outlined" label={"Mã số"} value="22679541" />

        <Button mode="contained" buttonColor="#0B6EF6" onPress={() => router.push("/home")}>
          Đăng nhập
        </Button>
      </View>
    </View>
  );
};

export default AuthPage;
