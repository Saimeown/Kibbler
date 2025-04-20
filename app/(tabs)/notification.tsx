import { View, Text, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

type NotificationItem = {
    id: number;
    type: 'feeding' | 'warning' | 'info' | 'error';
    text: string;
    time: string;
    read: boolean;
};

export default function Notification() {
    const notifications: NotificationItem[] = [
        { id: 1, type: 'feeding', text: '#00623F4E1B was fed 30 mins ago', time: '30m ago', read: false },
        { id: 2, type: 'warning', text: 'Food level below 50%', time: '2h ago', read: true },
        { id: 3, type: 'info', text: 'Battery fully charged', time: '4h ago', read: true },
        { id: 4, type: 'feeding', text: '#00623F4E1B was fed 6 hours ago', time: '6h ago', read: true },
        { id: 5, type: 'error', text: 'Feeder jam detected', time: '8h ago', read: true },
        { id: 6, type: 'feeding', text: '#00623F4E1B was fed 12 hours ago', time: '12h ago', read: true },
        { id: 7, type: 'info', text: 'Feeder connected to WiFi', time: '1d ago', read: true },
        { id: 8, type: 'warning', text: 'Battery level below 20%', time: '2d ago', read: true },
    ];

    const getIconForType = (type: string) => {
        switch (type) {
            case 'feeding':
                return icons['food-bowl'];
            case 'warning':
                return icons['warning'];
            case 'error':
                return icons['error'];
            default:
                return icons['info'];
        }
    };

    const getColorForType = (type: string) => {
        switch (type) {
            case 'feeding':
                return '#FFA726'; // Orange
            case 'warning':
                return '#F59E0B'; // Amber
            case 'error':
                return '#EF4444'; // Red
            default:
                return '#60A5FA'; // Blue
        }
    };

    return (
        <View style={styles.container}>
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
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {notifications.map((notification) => (
                    <View
                        key={notification.id}
                        style={[
                            styles.notificationCard,
                            !notification.read && styles.unreadNotification,
                            { borderLeftColor: getColorForType(notification.type) }
                        ]}
                    >
                        <View style={styles.notificationHeader}>
                            <Image
                                source={getIconForType(notification.type)}
                                style={[
                                    styles.notificationIcon,
                                    { tintColor: getColorForType(notification.type) }
                                ]}
                            />
                            <Text style={styles.notificationTime}>{notification.time}</Text>
                        </View>
                        <Text style={styles.notificationText}>{notification.text}</Text>
                        {!notification.read && (
                            <View style={[
                                styles.unreadBadge,
                                { backgroundColor: getColorForType(notification.type) }
                            ]}>
                                <Text style={styles.unreadBadgeText}>New</Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 24,
    },
    scrollContainer: {
        paddingBottom: 24,
    },
    header: {
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: '700',
        color: '#000000',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    notificationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderWidth: 1,
        borderColor: '#fac99b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    unreadNotification: {
        borderWidth: 1,
        borderColor: '#FFA726',
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    notificationIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    notificationTime: {
        color: '#888',
        fontSize: 12,
    },
    notificationText: {
        color: '#000000',
        fontSize: 14,
        lineHeight: 20,
    },
    unreadBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    unreadBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
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
});
