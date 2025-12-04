import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Icon } from "react-native-paper";

const HomeLayout = () => {
  return (
    <View className="flex flex-1 bg-white">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#0B6EF6",
          tabBarInactiveTintColor: "#64748B",
          tabBarStyle: { backgroundColor: "#FFFFFF" },
          sceneStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Icon color={color} size={24} source={"home"}></Icon>
            ),
          }}
        />

        <Tabs.Screen
          name="form"
          options={{
            title: "Form",
            tabBarIcon: ({ color }) => (
              <Icon color={color} size={24} source={"form-select"}></Icon>
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default HomeLayout;
