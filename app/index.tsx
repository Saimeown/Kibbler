// app/index.tsx
import { View, Text, Image, Animated, Easing, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react'; // Added useState
import { useRouter } from 'expo-router';

export default function SplashScreen() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const bowlFillAnim = useRef(new Animated.Value(0)).current;
    const pawPosition = useRef(new Animated.Value(0)).current;

    // Added state for current subtitle
    const [currentSubtitle, setCurrentSubtitle] = useState(0);
    const subtitles = [
        "Every pet deserves a full bowl.",
        "Whiskers approved, Worries removed.",
        "The future of pet care is before us.",
        "You may be far, but care doesn't have to be.",
        "When you can't be there, Kibbler is.",
        "Feed them right, day or night."
    ];

    useEffect(() => {
        // Subtitle change listener
        const subtitleListener = bowlFillAnim.addListener(({ value }) => {
            // Change subtitle based on fill progress
            const newSubtitle = Math.floor(value * (subtitles.length - 1));
            if (newSubtitle !== currentSubtitle) {
                setCurrentSubtitle(newSubtitle);
            }
        });

        // Sequence of animations
        Animated.sequence([
            // Fade in and scale up logo
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.elastic(1),
                    useNativeDriver: true,
                }),
            ]),

            // Paw bounce animation
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pawPosition, {
                        toValue: -20,
                        duration: 300,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pawPosition, {
                        toValue: 0,
                        duration: 300,
                        easing: Easing.bounce,
                        useNativeDriver: true,
                    }),
                ]),
                { iterations: 3 }
            ),

            // Bowl filling animation
            Animated.timing(bowlFillAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
        ]).start();

        const timer = setTimeout(() => {
            router.replace('/login');
        }, 4500); // Total animation duration

        return () => {
            clearTimeout(timer);
            bowlFillAnim.removeListener(subtitleListener); // Clean up listener
        };
    }, []);

    const bowlHeight = bowlFillAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            {/* Animated Pet Bowl */}
            <View style={styles.bowlContainer}>
                <View style={styles.bowl}>
                    <Animated.View
                        style={[
                            styles.food,
                            { height: bowlHeight }
                        ]}
                    />
                </View>
            </View>

            {/* Animated Paw */}
            <Animated.View
                style={[
                    styles.pawContainer,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { translateY: pawPosition }
                        ]
                    }
                ]}
            >
                <Image
                    source={require('@/assets/icons/paw.png')}
                    style={styles.pawImage}
                />
            </Animated.View>

            {/* App Name */}
            <Animated.Text style={[styles.title, { opacity: fadeAnim, fontFamily: 'georgia' }]}>
                Kibbler
            </Animated.Text>

            {/* Changing Subtitle */}
            <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
                {subtitles[currentSubtitle]}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFBEB',
    },
    bowlContainer: {
        marginBottom: 40,
    },
    bowl: {
        width: 180,
        height: 120,
        borderRadius: 100,
        borderBottomLeftRadius: 80,
        borderBottomRightRadius: 80,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#e67c00',
        overflow: 'hidden',
        justifyContent: 'flex-end',
    },
    food: {
        backgroundColor: '#f9a825',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#e67c00',
    },
    pawContainer: {
        position: 'absolute',
        top: '20%',
    },
    pawImage: {
        width: 100,
        height: 100,
        tintColor: '#e67c00',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#e67c00',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#c76b02',
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
