// Kibbler/app/login.tsx
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Easing, Image, Dimensions } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const { width, height } = Dimensions.get('window');

    // Animation values
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideUpAnim = useRef(new Animated.Value(30)).current;
    const pawScale = useRef(new Animated.Value(0.8)).current;
    const foodBowlAnim = useRef(new Animated.Value(0)).current;

    // Subtitle animation
    const [currentSubtitle, setCurrentSubtitle] = useState(0);
    const subtitles = [
        "Whiskers Approved. Worries Removed.",
        "Every pet deserves a full bowl.",
        "The future of pet care is before us.",
        "No paw left unfed.",
        "When you can't be there, Kibbler is.",
        "Feed them right, day or night."
    ];
    const subtitleAnim = useRef(new Animated.Value(1)).current; // Start at 1 for immediate visibility

    useEffect(() => {
        // Entry animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.spring(pawScale, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(foodBowlAnim, {
                toValue: 1,
                duration: 1500,
                delay: 300,
                useNativeDriver: false,
            })
        ]).start();

        // Subtitle rotation animation
        const subtitleInterval = setInterval(() => {
            // Fade out current subtitle
            Animated.timing(subtitleAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                // Change subtitle when completely faded out
                setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
                // Fade in new subtitle
                Animated.timing(subtitleAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 3000); // Change subtitle every 3 seconds

        return () => clearInterval(subtitleInterval);
    }, []);

    const handleLogin = async () => {
        setIsLoading(true);
        const success = await login(username, password);

        if (success) {
            // Success animation before navigation
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(slideUpAnim, {
                    toValue: -30,
                    duration: 500,
                    useNativeDriver: true,
                })
            ]).start(() => router.push('/(tabs)'));
        } else {
            // Shake animation on error
            const shakeAnim = new Animated.Value(0);
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
            ]).start();

            Alert.alert('Invalid Credentials', 'Please try again.');
            setIsLoading(false);
        }
    };

    const subtitleOpacity = subtitleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });

    return (
        <View style={styles.container}>
            {/* Subtle Background Elements */}
            <Image
                source={require('@/assets/icons/paw.png')}
                style={[styles.backgroundPaw, styles.paw1]}
                resizeMode="contain"
            />
            <Image
                source={require('@/assets/icons/paw.png')}
                style={[styles.backgroundPaw, styles.paw2]}
                resizeMode="contain"
            />
            <Image
                source={require('@/assets/icons/food-bowl.png')}
                style={[styles.backgroundBowl, styles.bowl1]}
                resizeMode="contain"
            />

            {/* Food Particles */}
            {[...Array(15)].map((_, i) => {
                const left = (Math.random() * 0.9 + 0.05) * width;
                const top = (Math.random() * 0.6 + 0.2) * height;
                const size = Math.random() * 8 + 4;
                const opacity = Math.random() * 0.4 + 0.1;
                const rotation = Math.random() * 360;

                return (
                    <View
                        key={`particle-${i}`}
                        style={{
                            position: 'absolute',
                            left,
                            top,
                            width: size,
                            height: size,
                            backgroundColor: '#e67c00',
                            borderRadius: size / 2,
                            opacity,
                            transform: [{ rotate: `${rotation}deg` }]
                        }}
                    />
                );
            })}

            {/* Animated Logo */}
            <Animated.View style={[styles.logoContainer, {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
            }]}>
                <Animated.Image
                    source={require('@/assets/icons/paw.png')}
                    style={[styles.logo, {
                        transform: [{ scale: pawScale }]
                    }]}
                />
                <Text style={styles.appName}>Kibbler</Text>
            </Animated.View>

            {/* Animated Form */}
            <Animated.View style={[styles.formContainer, {
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }]
            }]}>
                <Animated.Text style={[styles.subtitle, {
                    opacity: subtitleOpacity
                }]}>
                    {subtitles[currentSubtitle]}
                </Animated.Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="#aaa"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity>
                    <Text style={styles.footerLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#FFFBEB',
        overflow: 'hidden',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 100,
        height: 100,
        tintColor: '#e67c00',
        marginBottom: 10,
    },
    appName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#e67c00',
        fontFamily: 'georgia',
    },
    formContainer: {
        width: '100%',
        marginBottom: 120,
    },
    subtitle: {
        fontSize: 18,
        color: '#d6791c',
        marginBottom: 30,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
        marginBottom: 8,
        marginLeft: 5,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        height: 50,
        backgroundColor: '#e67c00',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#e67c00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    footerText: {
        color: '#666',
    },
    footerLink: {
        color: '#e67c00',
        fontWeight: '600',
    },
    // Background elements
    backgroundPaw: {
        position: 'absolute',
        width: 120,
        height: 120,
        opacity: 0.1,
        tintColor: '#e67c00',
    },
    paw1: {
        top: '10%',
        left: '-10%',
        transform: [{ rotate: '20deg' }],
    },
    paw2: {
        bottom: '15%',
        right: '-10%',
        transform: [{ rotate: '-15deg' }],
    },
    backgroundBowl: {
        position: 'absolute',
        width: 100,
        height: 100,
        opacity: 0.1,
        tintColor: '#e67c00',
    },
    bowl1: {
        top: '70%',
        left: '80%',
        transform: [{ rotate: '45deg' }],
    },
});
