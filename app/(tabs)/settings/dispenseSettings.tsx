import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    DispenseSettings: {
        mode: 'detection' | 'scheduled';
    };
};

type DispenseSettingsRouteProp = RouteProp<RootStackParamList, 'DispenseSettings'>;

interface DetectionSettings {
    dispensesPerDetection: number;
    timeGap: number;
}

interface ScheduledSettings {
    dailyDispenses: number;
    firstDispenseTime: Date;
    timeGap: number;
}

export default function DispenseSettings() {
    const route = useRoute<DispenseSettingsRouteProp>();
    const { mode } = route.params || { mode: 'detection' };

    const [showTimePicker, setShowTimePicker] = useState(false);

    const [detectionSettings, setDetectionSettings] = useState<DetectionSettings>({
        dispensesPerDetection: 1,
        timeGap: 5
    });

    const [scheduledSettings, setScheduledSettings] = useState<ScheduledSettings>({
        dailyDispenses: 3,
        firstDispenseTime: new Date(2023, 0, 1, 7, 0),
        timeGap: 4
    });

    const onChangeTime = (event: any, selectedDate?: Date) => {
        setShowTimePicker(false);
        if (selectedDate) {
            setScheduledSettings(prev => ({
                ...prev,
                firstDispenseTime: selectedDate
            }));
        }
    };

    // Save settings
    const saveSettings = async () => {
        try {
            if (mode === 'detection') {
                await AsyncStorage.setItem('detectionSettings', JSON.stringify(detectionSettings));
            } else {
                await AsyncStorage.setItem(
                    'scheduledSettings',
                    JSON.stringify({
                        ...scheduledSettings,
                        firstDispenseTime: scheduledSettings.firstDispenseTime.toISOString()
                    })
                );
            }
            Alert.alert('Success', 'Settings saved successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to save settings.');
            console.error(error);
        }
    };

    // Load saved settings on mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                if (mode === 'detection') {
                    const stored = await AsyncStorage.getItem('detectionSettings');
                    if (stored) setDetectionSettings(JSON.parse(stored));
                } else {
                    const stored = await AsyncStorage.getItem('scheduledSettings');
                    if (stored) {
                        const parsed = JSON.parse(stored);
                        parsed.firstDispenseTime = new Date(parsed.firstDispenseTime);
                        setScheduledSettings(parsed);
                    }
                }
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        };

        loadSettings();
    }, [mode]);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>
                    {mode === 'detection' ? 'Detection-Based' : 'Scheduled'} Dispensing
                </Text>

                {mode === 'detection' ? (
                    <>
                        <View style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Dispenses per Detection</Text>
                            <Text style={styles.settingDescription}>
                                How many times to dispense when an RFID tag is detected
                            </Text>
                            <Picker
                                selectedValue={detectionSettings.dispensesPerDetection.toString()}
                                onValueChange={(itemValue: string) =>
                                    setDetectionSettings(prev => ({
                                        ...prev,
                                        dispensesPerDetection: parseInt(itemValue, 10)
                                    }))
                                }>
                                {[1, 2, 3, 4, 5].map(num => (
                                    <Picker.Item key={num} label={`${num} time${num > 1 ? 's' : ''}`} value={num.toString()} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Time Gap Between Dispenses</Text>
                            <Text style={styles.settingDescription}>
                                Minutes to wait between each dispense
                            </Text>
                            <Picker
                                selectedValue={detectionSettings.timeGap.toString()}
                                onValueChange={(itemValue: string) =>
                                    setDetectionSettings(prev => ({
                                        ...prev,
                                        timeGap: parseInt(itemValue, 10)
                                    }))
                                }>
                                {[1, 2, 3, 5, 10, 15, 20, 30].map(min => (
                                    <Picker.Item key={min} label={`${min} minute${min > 1 ? 's' : ''}`} value={min.toString()} />
                                ))}
                            </Picker>
                        </View>
                    </>
                ) : (
                    <>
                        <View style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Daily Dispenses</Text>
                            <Text style={styles.settingDescription}>
                                How many times to dispense food each day
                            </Text>
                            <Picker
                                selectedValue={scheduledSettings.dailyDispenses.toString()}
                                onValueChange={(itemValue: string) =>
                                    setScheduledSettings(prev => ({
                                        ...prev,
                                        dailyDispenses: parseInt(itemValue, 10)
                                    }))
                                }>
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <Picker.Item key={num} label={`${num} time${num > 1 ? 's' : ''}`} value={num.toString()} />
                                ))}
                            </Picker>
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingTitle}>First Dispense Time</Text>
                            <Text style={styles.settingDescription}>
                                When the first daily dispense should occur
                            </Text>
                            <TouchableOpacity
                                style={styles.timePickerButton}
                                onPress={() => setShowTimePicker(true)}>
                                <Text style={styles.timeText}>
                                    {scheduledSettings.firstDispenseTime.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Text>
                            </TouchableOpacity>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={scheduledSettings.firstDispenseTime}
                                    mode="time"
                                    is24Hour={false}
                                    display="default"
                                    onChange={onChangeTime}
                                />
                            )}
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingTitle}>Time Gap Between Dispenses</Text>
                            <Text style={styles.settingDescription}>
                                Hours to wait between each dispense
                            </Text>
                            <Picker
                                selectedValue={scheduledSettings.timeGap.toString()}
                                onValueChange={(itemValue: string) =>
                                    setScheduledSettings(prev => ({
                                        ...prev,
                                        timeGap: parseInt(itemValue, 10)
                                    }))
                                }>
                                {[1, 2, 3, 4, 6, 8, 12].map(hour => (
                                    <Picker.Item key={hour} label={`${hour} hour${hour > 1 ? 's' : ''}`} value={hour.toString()} />
                                ))}
                            </Picker>
                        </View>
                    </>
                )}

                <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
                    <Text style={styles.saveButtonText}>Save Settings</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        paddingTop: 60,
    },
    scrollContainer: {
        padding: 24,
        paddingBottom: 80,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f0d23',
        marginBottom: 24,
    },
    settingItem: {
        marginBottom: 24,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f0d23',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 12,
    },
    timePickerButton: {
        backgroundColor: '#f3f4f6',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 16,
        color: '#0f0d23',
    },
    saveButton: {
        backgroundColor: '#000000',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: '#ffd28e',
        fontSize: 16,
        fontWeight: '600',
    },
});
