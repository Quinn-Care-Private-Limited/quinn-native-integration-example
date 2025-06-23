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
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Text style={styles.title}>Quinn Widgets Demo</Text>
              <Text style={styles.subtitle}>Interactive Video Content</Text>
            </View>

            <View style={styles.widgetSection}>
              <View style={styles.widgetCard}>
                <View style={styles.widgetHeader}>
                  <Text style={styles.widgetTitle}>🎠 Carousel Widget</Text>
                  <Text style={styles.widgetDescription}>
                    Swipeable card carousel
                  </Text>
                </View>
                <View style={styles.widgetContainer}>
                  <QuinnWidget
                    handle="PRODUCT_77957773577723"
                    widgettype="cards"
                    layer={1}
                  />
                </View>
              </View>

              <View style={styles.widgetCard}>
                <View style={styles.widgetHeader}>
                  <Text style={styles.widgetTitle}>📖 Story Widget</Text>
                </View>
                <View style={styles.widgetContainer}>
                  <QuinnWidget
                    handle="PRODUCT_77957773577723"
                    widgettype="story"
                    layer={1}
                  />
                </View>
              </View>

              <View style={styles.widgetCard}>
                <View style={styles.widgetHeader}>
                  <Text style={styles.widgetTitle}>🎈 Floating Widget</Text>
                  <Text style={styles.widgetDescription}>
                    Appears in bottom-right corner
                  </Text>
                </View>
                <View style={styles.widgetContainer}>
                  <View style={styles.floatingPlaceholder}>
                    <Text style={styles.placeholderText}>
                      Floating widget will appear in bottom-right corner
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Powered by Quinn</Text>
            </View>
          </ScrollView>

          {/* Floating widget rendered outside scroll view for proper positioning */}
          <QuinnWidget
            handle="PRODUCT_77957773577723"
            widgettype="floating"
            layer={1}
          />
        </View>
      </QuinnOverlayContextProvider>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#667eea",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
    textAlign: "center",
    fontWeight: "500",
  },
  widgetSection: {
    paddingHorizontal: 20,
    gap: 24,
  },
  widgetCard: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  widgetHeader: {
    marginBottom: 16,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 4,
  },
  widgetDescription: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },
  widgetContainer: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f7fafc",
  },
  floatingPlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#ffffff",
    opacity: 0.8,
    fontWeight: "500",
  },
});
