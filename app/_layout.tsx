import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)" // Make sure this stays as the main tab navigation.
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="profile"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
