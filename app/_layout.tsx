import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import QuinnOverlayContextProvider from "@/components/quinn-context-provider";
import QuinnWidget from "@/components/quinn-widget";
import { useColorScheme } from "@/hooks/useColorScheme";
import { initApp } from "@quinninc/rn-core/config/app";
import { View } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  initApp({
    sft: "2ec3f47f23570561cf643e4f2f35c136",
    cdn: "//cdn.shopify.com/s/files/1/0762/3871/7178/files/",
    shop_domain: "quinn-react-native-app-test.myshopify.com",
    shop_type: "SHOPIFY",
  });
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QuinnOverlayContextProvider>
        <View style={{ paddingHorizontal: 16, paddingTop: 100 }}>
          <QuinnWidget handle="PAGE_pageid" widgettype="cards" layer={1} />
        </View>
      </QuinnOverlayContextProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
