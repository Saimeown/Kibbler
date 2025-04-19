import { View, Image, Animated, Dimensions, ImageBackground } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Tabs } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = (width - 40) / TAB_COUNT;

type IconName =
    | 'home-light' | 'home-dark'
    | 'settings-light' | 'settings-dark'
    | 'camera-light' | 'camera-dark'
    | 'notification-light' | 'notification-dark'
    | 'profile-light' | 'profile-dark';

const getIconName = (routeName: string) => {
    switch(routeName) {
        case 'index': return 'home';
        case 'settings': return 'settings';
        case 'camera': return 'camera';
        case 'notification': return 'notification';
        case 'profile': return 'profile';
        default: return 'home';
    }
};

const TabBar = ({ state, navigation }: any) => {
    const highlightPosition = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const position = state.index * TAB_WIDTH;
        Animated.spring(highlightPosition, {
            toValue: position,
            useNativeDriver: true,
            speed: 20,
            bounciness: 0,
        }).start();
    }, [state.index]);

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#000000',
            borderRadius: 50,
            marginHorizontal: 20,
            marginBottom: 36,
            height: 52,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            borderWidth: 1,
            borderColor: '#0f0d23',
            overflow: 'hidden',
        }}>
            <Animated.View
                style={{
                    position: 'absolute',
                    width: TAB_WIDTH,
                    height: '100%',
                    transform: [{ translateX: highlightPosition }],
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ImageBackground
                    source={images.highlight}
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    resizeMode="cover"
                >
                    {state.routes[state.index] && (
                        <Image
                            source={icons[`${getIconName(state.routes[state.index].name)}-dark` as IconName]}
                            style={{ width: 24, height: 24 }}
                        />
                    )}
                </ImageBackground>
            </Animated.View>

            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;
                const iconName = getIconName(route.name);

                return (
                    <View
                        key={route.key}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onTouchEnd={() => !isFocused && navigation.navigate(route.name)}
                    >
                        <Image
                            source={icons[`${iconName}-${isFocused ? 'dark' : 'light'}` as IconName]}
                            style={{
                                width: isFocused ? 0 : 20,
                                height: isFocused ? 0 : 20
                            }}
                        />
                    </View>
                );
            })}
        </View>
    );
};

export default function TabsLayout() {
    return (
        <Tabs
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="camera" />
            <Tabs.Screen name="notification" />
            <Tabs.Screen name="profile" />
            <Tabs.Screen name="settings" />
        </Tabs>
    );
}
