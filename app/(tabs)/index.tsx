import { View, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

type CircularProgressProps = {
    percentage: number;
    color: string;
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
    const { isAuthenticated } = useAuth();

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    const feederData: FeederData = {
        powerSource: 'battery',
        batteryLevel: 78,
        foodLevel: 65,
        uniquePetsFed: 3,
        feedingsToday: 12,
        averageDailyFeedings: 15,
        lastFed: '3m ago',
        notifications: [
            { id: 1, text: '#00623F4E1B was fed 30 mins ago', time: '30m' },
            { id: 2, text: 'Food level below 50%', time: '2h' },
            { id: 3, text: 'Battery fully charged', time: '4h' }
        ]
    };

    const CircularProgress = ({ percentage, color, label }: CircularProgressProps) => {
        const rotation = -90 + (percentage * 3.6);
        const secondaryRotation = percentage > 50 ? 180 : 0;

        return (
            <View style={styles.circleWrapper}>
                <View style={styles.circleContainer}>
                    <View style={styles.circleBackground} />
                    <View style={[
                        styles.circleProgress,
                        {
                            borderColor: color,
                            transform: [{ rotate: `${rotation}deg` }],
                            borderWidth: 10,
                            borderLeftColor: percentage > 50 ? color : 'transparent',
                            borderBottomColor: 'transparent',
                            borderRightColor: 'transparent'
                        }
                    ]} />
                    {percentage > 50 && (
                        <View style={[
                            styles.circleProgress,
                            {
                                borderColor: color,
                                transform: [{ rotate: `${secondaryRotation}deg` }],
                                borderWidth: 10,
                                borderLeftColor: 'transparent',
                                borderBottomColor: 'transparent',
                                borderRightColor: 'transparent'
                            }
                        ]} />
                    )}
                    <Text style={[styles.circlePercentage, { color }]}>{percentage}%</Text>
                </View>
                <Text style={[styles.statusText, { color: percentage < 20 ? '#ef4444' : color }]}>
                    {percentage < 20 ? 'Low!' : label}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.backgroundContainer}>
            {/* Subtle background elements */}
            <Image
                source={icons['paw']}
                style={[styles.backgroundPaw, styles.paw1]}
                resizeMode="contain"
            />
            <Image
                source={icons['paw']}
                style={[styles.backgroundPaw, styles.paw2]}
                resizeMode="contain"
            />
            <Image
                source={icons['paw']}
                style={[styles.backgroundPaw, styles.paw3]}
                resizeMode="contain"
            />
            <Image
                source={icons['paw']}
                style={[styles.backgroundPaw, styles.paw4]}
                resizeMode="contain"
            />
            <Image
                source={icons['paw']}
                style={[styles.backgroundPaw, styles.paw5]}
                resizeMode="contain"
            />

            {/* Fixed Header */}
            <View style={styles.fixedHeader}>
                <Text style={styles.headerTitle}>Home</Text>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <StatusBar barStyle="dark-content" />

                {/* Status Cards */}
                <View style={styles.topRow}>
                    <View style={[styles.card, styles.smallCard]}>
                        <View style={[styles.cardHeader, { marginTop: 5 }]}>
                            <Image
                                source={feederData.powerSource === 'wall' ? icons['power-adapter'] : icons['battery']}
                                style={[styles.cardIcon, { tintColor: '#e67c00' }]}
                            />
                            <Text style={styles.cardTitle}>
                                {feederData.powerSource === 'wall' ? 'Wall Power' : 'Battery'}
                            </Text>
                        </View>
                        <CircularProgress
                            percentage={feederData.powerSource === 'wall' ? 100 : feederData.batteryLevel}
                            color={feederData.batteryLevel < 20 ? '#ef4444' : '#e67c00'}
                            label={feederData.powerSource === 'wall' ? 'Connected' : 'Remaining'}
                        />
                    </View>

                    <View style={[styles.card, styles.smallCard]}>
                        <View style={[styles.cardHeader, { marginTop: 5 }]}>
                            <Image source={icons['food-bowl']} style={[styles.cardIcon, { tintColor: '#e67c00' }]} />
                            <Text style={styles.cardTitle}>Container</Text>
                        </View>
                        <CircularProgress
                            percentage={feederData.foodLevel}
                            color={feederData.foodLevel < 20 ? '#ef4444' : '#e67c00'}
                            label="Food Level"
                        />
                    </View>
                </View>

                {/* Feeding Stats Card */}
                <View style={[styles.card, { marginBottom: 16 }]}>
                    <View style={styles.cardHeader}>
                        <Image source={icons['feeding-stats']} style={[styles.icon, { tintColor: '#e67c00' }]} />
                        <Text style={styles.cardHeaderText}>Feeding Statistics</Text>
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
                                    <Image source={stat.icon} style={[styles.statIcon, { tintColor: '#e67c00' }]} />
                                </View>
                                <Text style={styles.statLabel}>{stat.label}</Text>
                                <Text style={styles.statValue}>{stat.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Recent Activity Card */}
                <View style={[styles.recentActivityCard, { marginBottom: 24 }]}>
                    <View style={styles.recentActivityHeader}>
                        <Image
                            source={icons['notification-light']}
                            style={[styles.recentActivityIcon, { tintColor: '#e67c00' }]}
                        />
                        <Text style={styles.recentActivityHeaderText}>Recent Activity</Text>
                    </View>

                    {feederData.notifications.map((item) => (
                        <View key={item.id} style={styles.recentActivityItem}>
                            <View style={styles.recentActivityDot} />
                            <View style={styles.recentActivityContent}>
                                <Text style={styles.recentActivityText}>{item.text}</Text>
                                <Text style={styles.recentActivityTime}>{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        position: 'relative',
    },
    fixedHeader: {
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 8,
        backgroundColor: '#FFFBEB',
        zIndex: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
    },
    scrollContent: {
        paddingTop: 14,
        paddingBottom: 90,
    },
    backgroundPaw: {
        position: 'absolute',
        width: 120,
        height: 120,
        opacity: 0.3,
        tintColor: '#f7a75c',
    },
    paw1: {
        top: 125,
        left: -30,
        transform: [{ rotate: '20deg' }],
    },
    paw2: {
        bottom: 150,
        right: -20,
        transform: [{ rotate: '-15deg' }],
    },
    paw3: {
        top: '40%',
        right: 50,
        transform: [{ rotate: '45deg' }],
    },
    paw4: {
        top: '60%',
        right: 300,
        transform: [{ rotate: '45deg' }],
    },
    paw5: {
        top: '14.4%',
        right: 20,
        transform: [{ rotate: '910deg' }],
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#c76b02',
        marginTop: 4,
        fontStyle: 'italic',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 16,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e6be97',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    smallCard: {
        flex: 1,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        minHeight: 0,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    cardHeaderText: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        marginLeft: 8,
    },
    cardTitle: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        marginRight: 10,
    },
    icon: {
        width: 20,
        height: 20,
    },
    circleWrapper: {
        alignItems: 'center',
        marginTop: 4,
    },
    circleContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 4,
    },
    circleBackground: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 10,
        borderColor: '#e0d6b7',
    },
    circleProgress: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    circlePercentage: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    statusText: {
        fontSize: 12,
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
        backgroundColor: '#fcf4eb',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e67c00',
        padding: 16,
        alignItems: 'center',
    },
    statIconContainer: {
        backgroundColor: '#ffe699',
        width: 0,
        height: 0,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    statIcon: {
        width: 28,
        height: 28,
        marginTop: 30,
    },
    statLabel: {
        color: '#000000',
        fontSize: 12,
        marginBottom: 4,
        marginTop: 15,
    },
    statValue: {
        color: '#e67c00',
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
        backgroundColor: '#e67c00',
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
    },
    recentActivityCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e6be97',
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    recentActivityHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    recentActivityIcon: {
        width: 24,
        height: 24,
    },
    recentActivityHeaderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000000',
        marginLeft: 8,
    },
    recentActivityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    recentActivityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e67c00',
        marginRight: 12,
    },
    recentActivityContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recentActivityText: {
        color: '#000000',
        fontSize: 14,
        flex: 1,
    },
    recentActivityTime: {
        color: '#e67c00',
        fontSize: 12,
        marginLeft: 8,
    },
});
