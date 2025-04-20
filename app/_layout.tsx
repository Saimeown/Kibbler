import { Stack } from "expo-router";
import { AuthProvider } from '@/hooks/useAuth';
import './globals.css';

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack>
                {/* Splash Screen - shown first */}
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                />

                {/* Login Screen */}
                <Stack.Screen
                    name="login"
                    options={{ headerShown: false }}
                />

                {/* Main App Screens - protected routes */}
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="profile"
                    options={{ headerShown: false }}
                />

                {/* Add other screens here as needed */}
            </Stack>
        </AuthProvider>
    );
}
