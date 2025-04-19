// app/index.tsx
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
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
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Home</Text>
            </View>

            <View style={styles.topRow}>
                <View style={[styles.card, styles.smallCard]}>
                    <Text style={styles.cardTitle}>
                        {feederData.powerSource === 'wall' ? 'Wall Power' : 'Battery'}
                    </Text>
                    <CircularProgress
                        percentage={feederData.powerSource === 'wall' ? 100 : feederData.batteryLevel}
                        color={feederData.batteryLevel < 20 ? '#ef4444' : '#ffd28e'}
                        icon={feederData.powerSource === 'wall' ? icons['power-adapter'] : icons['battery']}
                        label={feederData.powerSource === 'wall' ? 'Connected' : 'Remaining'}
                    />
                </View>

                <View style={[styles.card, styles.smallCard]}>
                    <Text style={styles.cardTitle}>Food Container</Text>
                    <CircularProgress
                        percentage={feederData.foodLevel}
                        color={feederData.foodLevel < 20 ? '#ef4444' : '#ffd28e'}
                        icon={icons['food-bowl']}
                        label="Level"
                    />
                </View>
            </View>

            <View style={[styles.card, { marginBottom: 16 }]}>
                <View style={styles.cardHeader}>
                    <Image source={icons['feeding-stats']} style={[styles.icon, { tintColor: '#ffd28e' }]} />
                    <Text style={styles.cardHeaderText}>Feeding Stats</Text>
                </View>

                <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Pets</Text>
                        <Text style={styles.statValue}>{feederData.uniquePetsFed}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Today</Text>
                        <Text style={styles.statValue}>{feederData.feedingsToday}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Avg/Day</Text>
                        <Text style={styles.statValue}>{feederData.averageDailyFeedings}</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Last Fed</Text>
                        <Text style={styles.statValue}>{feederData.lastFed}</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.card, { marginBottom: 16 }]}>
                <View style={styles.cardHeader}>
                    <Image source={icons['notification-light']} style={[styles.icon, { tintColor: '#ffd28e' }]} />
                    <Text style={styles.cardHeaderText}>Recent Activity</Text>
                </View>

                {feederData.notifications.map((item) => (
                    <View key={item.id} style={styles.notificationItem}>
                        <Text style={styles.notificationText}>{item.text}</Text>
                        <Text style={styles.notificationTime}>{item.time}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        padding: 24,
        paddingTop: 60
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
    },
    card: {
        backgroundColor: '#000000',
        borderRadius: 30,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    smallCard: {
        width: '48%',
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    cardHeaderText: {
        fontSize: 18,
        color: '#ffd28e',
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 18,
        color: '#ffd28e',
        marginBottom: 16,
        textAlign: 'center',
    },
    icon: {
        width: 24,
        height: 24,
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
        justifyContent: 'space-between',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    statLabel: {
        color: '#9ca3af',
        fontSize: 14,
        marginBottom: 4,
        marginRight: 10,
    },
    statValue: {
        color: '#ffd28e',
        fontSize: 14,
        fontWeight: 400,
        marginRight: 10,
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2741',
    },
    notificationText: {
        color: '#9ca3af',
        flex: 1,
    },
    notificationTime: {
        color: '#ffd28e',
        fontSize: 12,
    }
});
