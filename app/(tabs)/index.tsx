import { View, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

type CircularProgressProps = {
    percentage: number;
    color: string;
    icon: any;
    label: string;
};

type NotificationItem = {
    id: number;
    text: string;
    time: string;
};

type FeederData = {
    powerSource: 'wall' | 'battery';
    batteryLevel: number;
    foodLevel: number;
    uniquePetsFed: number;
    feedingsToday: number;
    averageDailyFeedings: number;
    lastFed: string;
    notifications: NotificationItem[];
};

export default function Index() {
    const feederData: FeederData = {
        powerSource: 'battery',
        batteryLevel: 78,
        foodLevel: 30,
        uniquePetsFed: 3,
        feedingsToday: 12,
        averageDailyFeedings: 15,
        lastFed: '2h ago',
        notifications: [
            { id: 1, text: '#00623F4E1B was fed 30 mins ago', time: '30m' },
            { id: 2, text: 'Food level below 50%', time: '2h' },
            { id: 3, text: 'Battery fully charged', time: '4h' }
        ]
    };

    const CircularProgress = ({ percentage, color, icon, label }: CircularProgressProps) => {
        return (
            <View style={styles.circleWrapper}>
                <View style={styles.circleContainer}>
                    <View style={styles.circleBackground} />
                    <View style={[
                        styles.circleProgress,
                        {
                            borderColor: color,
                            transform: [{ rotate: '45deg' }],
                            borderWidth: 10,
                            borderLeftColor: 'transparent',
                            borderBottomColor: 'transparent'
                        }
                    ]} />
                    <Image
                        source={icon}
                        style={[styles.circleIcon, { tintColor: color }]}
                    />
                </View>
                <Text style={[styles.percentageText, { color }]}>{percentage}%</Text>
                <Text style={[styles.statusText, { color: percentage < 20 ? '#ef4444' : color }]}>
                    {percentage < 20 ? 'Low!' : label}
                </Text>
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Home</Text>
            </View>

            {/* Status Cards */}
            <View style={styles.topRow}>
                <View style={[styles.card, styles.smallCard]}>
                    <View style={styles.cardHeader}>
                        <Image
                            source={feederData.powerSource === 'wall' ? icons['power-adapter'] : icons['battery']}
                            style={[styles.cardIcon, { tintColor: '#ffd28e' }]}
                        />
                        <Text style={styles.cardTitle}>
                            {feederData.powerSource === 'wall' ? 'Wall Power' : 'Battery'}
                        </Text>
                    </View>
                    <CircularProgress
                        percentage={feederData.powerSource === 'wall' ? 100 : feederData.batteryLevel}
                        color={feederData.batteryLevel < 20 ? '#ef4444' : '#ffd28e'}
                        icon={feederData.powerSource === 'wall' ? icons['power-adapter'] : icons['battery']}
                        label={feederData.powerSource === 'wall' ? 'Connected' : 'Remaining'}
                    />
                </View>

                <View style={[styles.card, styles.smallCard]}>
                    <View style={styles.cardHeader}>
                        <Image source={icons['food-bowl']} style={[styles.cardIcon, { tintColor: '#ffd28e' }]} />
                        <Text style={styles.cardTitle}>Food Container</Text>
                    </View>
                    <CircularProgress
                        percentage={feederData.foodLevel}
                        color={feederData.foodLevel < 20 ? '#ef4444' : '#ffd28e'}
                        icon={icons['food-bowl']}
                        label="Level"
                    />
                </View>
            </View>

            {/* Feeding Stats Card */}
            <View style={[styles.card, { marginBottom: 16 }]}>
                <View style={styles.cardHeader}>
                    <Image source={icons['feeding-stats']} style={[styles.icon, { tintColor: '#ffd28e' }]} />
                    <Text style={styles.cardHeaderText}>Feeding Stats</Text>
                </View>

                <View style={styles.statsGrid}>
                    {[
                        { label: 'Pets', value: feederData.uniquePetsFed, icon: icons['paw'] },
                        { label: 'Today', value: feederData.feedingsToday, icon: icons['calendar'] },
                        { label: 'Avg/Day', value: feederData.averageDailyFeedings, icon: icons['trending-up'] },
                        { label: 'Last Fed', value: feederData.lastFed, icon: icons['clock'] }
                    ].map((stat, index) => (
                        <View key={index} style={styles.statItem}>
                            <View style={styles.statIconContainer}>
                                <Image source={stat.icon} style={[styles.statIcon, { tintColor: '#ffd28e' }]} />
                            </View>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Recent Activity Card */}
            <View style={[styles.card, { marginBottom: 24 }]}>
                <View style={styles.cardHeader}>
                    <Image source={icons['notification-light']} style={[styles.icon, { tintColor: '#ffd28e' }]} />
                    <Text style={styles.cardHeaderText}>Recent Activity</Text>
                </View>

                {feederData.notifications.map((item) => (
                    <View key={item.id} style={styles.notificationItem}>
                        <View style={styles.notificationDot} />
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationText}>{item.text}</Text>
                            <Text style={styles.notificationTime}>{item.time}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        padding: 24,
        paddingTop: 60,
        marginBottom: 80,
    },
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#0f0d23',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#6b7280',
        marginTop: 4,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 16,
    },
    card: {
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    smallCard: {
        flex: 1,
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    cardIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    cardHeaderText: {
        fontSize: 18,
        color: '#ffd28e',
        fontWeight: '600',
        marginLeft: 8,
    },
    cardTitle: {
        fontSize: 16,
        color: '#ffd28e',
        fontWeight: '600',
    },
    icon: {
        width: 20,
        height: 20,
    },
    circleWrapper: {
        alignItems: 'center',
        marginTop: 8,
    },
    circleContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 8,
    },
    circleBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 6,
        borderColor: '#2a2741',
    },
    circleProgress: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    circleIcon: {
        width: 24,
        height: 24,
    },
    percentageText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    statItem: {
        width: '48%',
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    statIconContainer: {
        backgroundColor: '#2a2741',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    statIcon: {
        width: 18,
        height: 18,
    },
    statLabel: {
        color: '#9ca3af',
        fontSize: 12,
        marginBottom: 4,
    },
    statValue: {
        color: '#ffd28e',
        fontSize: 18,
        fontWeight: '600',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2741',
    },
    notificationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ffd28e',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationText: {
        color: '#e5e7eb',
        fontSize: 14,
        flex: 1,
    },
    notificationTime: {
        color: '#9ca3af',
        fontSize: 12,
        marginLeft: 8,
    }
});
