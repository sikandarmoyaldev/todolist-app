import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";

import { NAV_THEME } from "@/lib/theme";
import "./globals.css";

export default function RootLayout() {
    const colorScheme = useColorScheme() ?? "light";

    return (
        // ✅ GestureHandlerRootView MUST wrap everything that uses gestures
        <GestureHandlerRootView className="flex-1">
            <ThemeProvider value={NAV_THEME[colorScheme]}>
                <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

                <View className="flex-1 bg-background">
                    <Stack screenOptions={{ headerShown: false }} />
                    <PortalHost />
                    <Toaster theme={colorScheme} position="center" />
                </View>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}
