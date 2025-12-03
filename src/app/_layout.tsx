import { Provider } from "react-redux";
import "../global.css";
import { Slot } from "expo-router";
import { store } from "@/core/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView className="flex flex-1">
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
