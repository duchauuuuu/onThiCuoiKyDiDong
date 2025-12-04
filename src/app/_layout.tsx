import { Provider } from "react-redux";
import "../global.css";
import { Slot } from "expo-router";
import { store } from "@/core/store";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MD3LightTheme, PaperProvider } from "react-native-paper";

export default function Layout() {
  const theme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: "#0B6EF6",
      secondary: "#0A53B5",
      background: "#FFFFFF",
      surface: "#FFFFFF",
      surfaceVariant: "#FFFFFF",
      primaryContainer: "#DCEBFF",
      secondaryContainer: "#DCEBFF",
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView className="flex flex-1 bg-white">
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
