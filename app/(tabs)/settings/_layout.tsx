import { Stack } from 'expo-router';

export default function SettingsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#FFFBEB',
                },
                headerTitleStyle: {
                    color: '#0f0d23',
                    fontWeight: 'bold',
                },
                headerBackTitle: 'Back',
                headerTintColor: '#ffd28e',
            }}
        >
            <Stack.Screen
                name="settingsTab"
                options={{ title: 'Settings' }}
            />
            <Stack.Screen
                name="dispenseSettings"
                options={{ title: 'Dispense Settings' }}
            />
        </Stack>
    );
}
