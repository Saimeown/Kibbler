// app/notification.tsx
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
                return '#ffd28e';
            case 'warning':
                return '#f59e0b';
            case 'error':
                return '#ef4444';
            default:
                return '#60a5fa';
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false} // Hide scroll indicator
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
                            <View style={styles.unreadBadge}>
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
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 100, // Add padding at the bottom to avoid tab bar overlap
    },
    scrollContainer: {
        paddingBottom: 24,
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
    notificationCard: {
        backgroundColor: '#000000',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    unreadNotification: {
        borderWidth: 1,
        borderColor: '#ffd28e',
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
        color: '#9ca3af',
        fontSize: 12,
    },
    notificationText: {
        color: '#e5e7eb',
        fontSize: 14,
    },
    unreadBadge: {
        position: 'absolute',
        top: -0,
        right: -0,
        backgroundColor: '#ef4444',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    unreadBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
