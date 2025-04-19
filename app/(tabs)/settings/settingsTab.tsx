import { View, Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity, Switch } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    '(tabs)': undefined;
    'settings': {
        screen: 'dispenseSettings';
        params: { mode: 'detection' | 'scheduled' };
    };
    profile: undefined;
};

type SettingsNavigationProp = StackNavigationProp<RootStackParamList, '(tabs)'>;

type SettingItemBase = {
    id: number;
    title: string;
    icon: any;
    action: () => void;
};

type ToggleSettingItem = SettingItemBase & {
    isToggle: true;
    value: boolean;
    onChange: (val: boolean) => void;
    subtitle?: string;
};

type NavigationSettingItem = SettingItemBase & {
    hasChevron: true;
};

type SettingItem = ToggleSettingItem | NavigationSettingItem;

type SettingsSection = {
    title: string;
    icon: any;
    items: SettingItem[];
};

export default function SettingsTab() {
    const navigation = useNavigation<SettingsNavigationProp>();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [lowFoodAlerts, setLowFoodAlerts] = useState(true);
    const [batteryAlerts, setBatteryAlerts] = useState(true);
    const [powerSource, setPowerSource] = useState<'solar' | 'wall'>('wall');
    const [dispensingMode, setDispensingMode] = useState<'detection' | 'scheduled'>('scheduled');

    const settingsSections: SettingsSection[] = [
        {
            title: "Device SettingsTab",
            icon: icons['settings-light'],
            items: [
                {
                    id: 1,
                    title: "Power Source",
                    subtitle: powerSource === 'solar' ? "Solar Battery" : "Wall Adapter",
                    icon: powerSource === 'solar' ? icons['solar-panel'] : icons['power-adapter'],
                    action: () => setPowerSource(prev => prev === 'solar' ? 'wall' : 'solar'),
                    isToggle: true,
                    value: powerSource === 'solar',
                    onChange: (val: boolean) => setPowerSource(val ? 'solar' : 'wall')
                },
                {
                    id: 2,
                    title: "Dispensing Mode",
                    subtitle: dispensingMode === 'detection' ? "Detection-Based" : "Scheduled",
                    icon: dispensingMode === 'detection' ? icons['rfid'] : icons['clock'],
                    action: () => setDispensingMode(prev => prev === 'detection' ? 'scheduled' : 'detection'),
                    isToggle: true,
                    value: dispensingMode === 'detection',
                    onChange: (val: boolean) => setDispensingMode(val ? 'detection' : 'scheduled')
                },
                {
                    id: 3,
                    title: "Dispensing SettingsTab",
                    icon: icons['food-bowl'],
                    action: () => navigation.navigate('settings', {
                        screen: 'dispenseSettings',
                        params: { mode: dispensingMode }
                    }),
                    hasChevron: true
                }
            ]
        },
        {
            title: "App Preferences",
            icon: icons['preferences'],
            items: [
                {
                    id: 4,
                    title: "Notifications",
                    icon: icons['notification-light'],
                    action: () => {},
                    isToggle: true,
                    value: notificationsEnabled,
                    onChange: setNotificationsEnabled
                },
                {
                    id: 5,
                    title: "Dark Mode",
                    icon: icons['moon'],
                    action: () => {},
                    isToggle: true,
                    value: darkModeEnabled,
                    onChange: setDarkModeEnabled
                }
            ]
        },
        {
            title: "Alert SettingsTab",
            icon: icons['warning'],
            items: [
                {
                    id: 6,
                    title: "Low Food Alerts",
                    icon: icons['food-bowl'],
                    action: () => {},
                    isToggle: true,
                    value: lowFoodAlerts,
                    onChange: setLowFoodAlerts
                },
                {
                    id: 7,
                    title: "Battery Alerts",
                    icon: icons['battery'],
                    action: () => {},
                    isToggle: true,
                    value: batteryAlerts,
                    onChange: setBatteryAlerts
                }
            ]
        },
        {
            title: "Account",
            icon: icons['cat-profile'],
            items: [
                {
                    id: 8,
                    title: "Account Information",
                    icon: icons['cat-profile'],
                    action: () => console.log("Account Information pressed"),
                    hasChevron: true
                },
                {
                    id: 9,
                    title: "Change Password",
                    icon: icons['security'],
                    action: () => console.log("Change Password pressed"),
                    hasChevron: true
                }
            ]
        },
        {
            title: "Support",
            icon: icons['help'],
            items: [
                {
                    id: 10,
                    title: "Help Center",
                    icon: icons['help'],
                    action: () => console.log("Help Center pressed"),
                    hasChevron: true
                },
                {
                    id: 11,
                    title: "Contact Support",
                    icon: icons['message'],
                    action: () => console.log("Contact Support pressed"),
                    hasChevron: true
                },
                {
                    id: 12,
                    title: "About PetFeeder",
                    icon: icons['info'],
                    action: () => console.log("About pressed"),
                    hasChevron: true
                }
            ]
        }
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {settingsSections.map((section) => (
                    <View key={section.title} style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                        </View>
                        <View style={styles.sectionCard}>
                            {section.items.map((item) => (
                                <React.Fragment key={item.id}>
                                    <TouchableOpacity
                                        style={styles.settingItem}
                                        onPress={() => {
                                            if ('isToggle' in item && item.isToggle) {
                                                item.onChange(!item.value);
                                            } else {
                                                item.action();
                                            }
                                        }}
                                    >
                                        <View style={styles.settingLeft}>
                                            <Image source={item.icon} style={styles.settingIcon} />
                                            <View>
                                                <Text style={styles.settingText}>{item.title}</Text>
                                                {'subtitle' in item && item.subtitle && (
                                                    <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                                                )}
                                            </View>
                                        </View>
                                        {'isToggle' in item && item.isToggle ? (
                                            <Switch
                                                value={item.value}
                                                onValueChange={item.onChange}
                                                trackColor={{ true: '#ffd28e', false: '#e5e7eb' }}
                                                thumbColor="#ffffff"
                                            />
                                        ) : (
                                            <Image source={icons['chevron-right']} style={styles.chevronIcon} />
                                        )}
                                    </TouchableOpacity>
                                    {item.id !== section.items[section.items.length - 1].id && <View style={styles.divider} />}
                                </React.Fragment>
                            ))}
                        </View>
                    </View>
                ))}
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 16,
        backgroundColor: '#FFFBEB',
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0f0d23',
    },
    scrollContainer: {
        paddingHorizontal: 24,
        paddingBottom: 80,
    },
    versionContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    appIcon: {
        width: 80,
        height: 80,
        borderRadius: 16,
        marginBottom: 12,
    },
    versionText: {
        fontSize: 14,
        color: '#6b7280',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingLeft: 8,
    },
    sectionIcon: {
        width: 20,
        height: 20,
        tintColor: '#000000',
        marginRight: 12,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0f0d23',
    },
    sectionCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        width: 24,
        height: 24,
        tintColor: '#ffd28e',
        marginRight: 16,
    },
    settingText: {
        fontSize: 16,
        color: '#0f0d23',
    },
    settingSubtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    chevronIcon: {
        width: 16,
        height: 16,
        tintColor: '#9ca3af',
    },
    divider: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginLeft: 40,
    },
    logoutButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ef4444',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 54,
    },
    logoutText: {
        color: '#ef4444',
        fontSize: 16,
        fontWeight: '600',
    },
});
