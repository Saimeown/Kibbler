// app/profile.tsx
import { View, Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

export default function Profile() {
    const user = {
        name: 'Simon Garcia',
        connectedDevices: 2,
    };

    const devices = [
        {
            id: 'FEED-00623F',
            name: 'Kitchen Feeder',
            lastActive: '2h ago',
            isCurrent: true,
            pets: ['Cats'],
            foodLevel: 65
        },
        {
            id: 'FEED-18945B',
            name: 'Living Room Feeder',
            lastActive: '5m ago',
            isCurrent: false,
            pets: ['Cats'],
            foodLevel: 30
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Fixed Header */}
            <View style={styles.fixedHeader}>
                <Text style={styles.pageTitle}>Profile</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* User Profile Card */}
                <View style={styles.userCard}>
                    <Image source={icons['cat-profile']} style={styles.avatar} />
                    <Text style={styles.userName}>{user.name}</Text>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{user.connectedDevices}</Text>
                            <Text style={styles.statLabel}>Devices</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>3</Text>
                            <Text style={styles.statLabel}>Pets</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Feedings Today</Text>
                        </View>
                    </View>
                </View>

                {/* Current Device Banner */}
                <View style={styles.currentDeviceBanner}>
                    <Image source={icons['check-paw']} style={styles.currentDeviceIcon} />
                    <View style={styles.currentDeviceInfo}>
                        <Text style={styles.currentDeviceLabel}>CURRENTLY USING</Text>
                        <Text style={styles.currentDeviceName}>
                            {devices.find(d => d.isCurrent)?.name || 'No active device'}
                        </Text>
                    </View>
                </View>

                {/* Devices List */}
                <Text style={styles.sectionTitle}>Your Feeders</Text>

                {devices.map((device) => (
                    <TouchableOpacity
                        key={device.id}
                        style={[
                            styles.deviceCard,
                            device.isCurrent && styles.currentDeviceCard
                        ]}
                    >
                        <View style={styles.deviceHeader}>
                            <Image
                                source={device.isCurrent ? icons['paw'] : icons['paw']}
                                style={styles.deviceIcon}
                            />
                            <View>
                                <Text style={styles.deviceName}>{device.name}</Text>
                                <Text style={styles.deviceId}>{device.id}</Text>
                            </View>
                        </View>

                        <View style={styles.deviceDetails}>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Pets</Text>
                                <Text style={styles.detailValue}>
                                    {device.pets.join(', ')}
                                </Text>
                            </View>

                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Food Level</Text>
                                <View style={styles.foodLevelContainer}>
                                    <View
                                        style={[
                                            styles.foodLevelBar,
                                            {
                                                width: `${device.foodLevel}%`,
                                                backgroundColor: device.foodLevel < 20 ? '#ef4444' : '#ffd28e'
                                            }
                                        ]}
                                    />
                                    <Text style={styles.foodLevelText}>{device.foodLevel}%</Text>
                                </View>
                            </View>

                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Status</Text>
                                <View style={styles.statusContainer}>
                                    <View style={[
                                        styles.statusDot,
                                        device.lastActive.includes('m') ? styles.offline : styles.online
                                    ]} />
                                    <Text style={styles.statusText}>
                                        {device.isCurrent ? 'Active now' : `Last used ${device.lastActive}`}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Add Device Button */}
                <TouchableOpacity style={styles.addButton}>
                    <Image source={icons['plus']} style={styles.addIcon} />
                    <Text style={styles.addButtonText}>Connect New Feeder</Text>
                </TouchableOpacity>

                {/* App Settings Section */}
                <Text style={styles.sectionTitle}>App Settings</Text>
                <View style={styles.settingsCard}>
                    <TouchableOpacity style={styles.settingItem}>
                        <Image source={icons['settings-light']} style={styles.settingIcon} />
                        <Text style={styles.settingText}>Device Settings</Text>
                        <Image source={icons['chevron-right']} style={styles.chevronIcon} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingItem}>
                        <Image source={icons['notification-light']} style={styles.settingIcon} />
                        <Text style={styles.settingText}>Notification Preferences</Text>
                        <Image source={icons['chevron-right']} style={styles.chevronIcon} />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.settingItem}>
                        <Image source={icons['help']} style={styles.settingIcon} />
                        <Text style={styles.settingText}>Help & Support</Text>
                        <Image source={icons['chevron-right']} style={styles.chevronIcon} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
    },
    fixedHeader: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 16,
        backgroundColor: '#FFFBEB',
        zIndex: 10,
    },
    pageTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0f0d23',
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 80,
    },
    userCard: {
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 24,
        marginTop: 10,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#ffd28e',
        backgroundColor: 'orange',
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffd28e',
        marginBottom: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#9ca3af',
    },
    divider: {
        width: 1,
        backgroundColor: '#2a2741',
        marginHorizontal: 8,
    },
    currentDeviceBanner: {
        backgroundColor: '#ffd28e',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    currentDeviceIcon: {
        width: 24,
        height: 24,
        tintColor: '#000000',
        marginRight: 12,
    },
    currentDeviceInfo: {
        flex: 1,
    },
    currentDeviceLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000000',
        opacity: 0.7,
        marginBottom: 2,
    },
    currentDeviceName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7280',
        marginBottom: 16,
        marginTop: 5,
        letterSpacing: 1,
    },
    deviceCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    currentDeviceCard: {
        borderWidth: 1,
        borderColor: '#ffd28e',
    },
    deviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    deviceIcon: {
        width: 40,
        height: 40,
        tintColor: '#ffd28e',
        marginRight: 12,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0f0d23',
    },
    deviceId: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    deviceDetails: {
        marginLeft: 52, // Match icon width + margin
    },
    detailItem: {
        marginBottom: 10,
    },
    detailLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 14,
        color: '#0f0d23',
    },
    foodLevelContainer: {
        height: 20,
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    foodLevelBar: {
        position: 'absolute',
        height: '100%',
        borderRadius: 10,
    },
    foodLevelText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    online: {
        backgroundColor: '#10b981',
    },
    offline: {
        backgroundColor: '#6b7280',
    },
    statusText: {
        fontSize: 14,
        color: '#0f0d23',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 12,
        padding: 16,
        marginTop: 15,
        marginBottom: 30,
    },
    addIcon: {
        width: 20,
        height: 20,
        tintColor: '#ffd28e',
        marginRight: 8,
    },
    addButtonText: {
        color: '#ffd28e',
        fontWeight: '600',
    },
    settingsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    settingIcon: {
        width: 24,
        height: 24,
        tintColor: '#ffd28e',
        marginRight: 16,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: '#0f0d23',
    },
    chevronIcon: {
        width: 16,
        height: 16,
        tintColor: '#9ca3af',
    },
});
