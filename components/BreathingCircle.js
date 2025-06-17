import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from 'react-native-reanimated';

// BreathingCircle component for the 4-4-4-4 breathing animation
export default function BreathingCircle({ isActive }) {
  // Shared values for animations
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.7);

  // Animation styles
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const innerCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 / scale.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    if (isActive) {
      // Enhanced 4-4-4-4 breathing cycle animation
      scale.value = withRepeat(
        withSequence(
          withTiming(1.5, {
            duration: 4000,
            easing: Easing.bezierFn(0.4, 0, 0.2, 1),
          }), // Inhale: smooth expansion
          withTiming(1.5, {
            duration: 4000,
            easing: Easing.linear,
          }), // Hold: maintain size
          withTiming(1, {
            duration: 4000,
            easing: Easing.bezierFn(0.4, 0, 0.2, 1),
          }), // Exhale: smooth contraction
          withTiming(1, {
            duration: 4000,
            easing: Easing.linear,
          }) // Hold: maintain size
        ),
        -1,
        false
      );

      // Subtle opacity animation
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.9, { duration: 4000 }),
          withTiming(0.7, { duration: 4000 }),
          withTiming(0.9, { duration: 4000 }),
          withTiming(0.7, { duration: 4000 })
        ),
        -1,
        false
      );
    } else {
      // Reset animations
      scale.value = withTiming(1, { duration: 500 });
      opacity.value = withTiming(0.7, { duration: 500 });
    }
  }, [isActive]);

  // Breathing phase text based on timing
  const getBreathingText = () => {
    const time = (Date.now() % 16000) / 1000; // Cycle every 16 seconds
    if (time < 4) return 'Breathe In';
    if (time < 8) return 'Hold';
    if (time < 12) return 'Breathe Out';
    return 'Hold';
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, circleStyle]}>
        <Animated.View style={[styles.innerCircle, innerCircleStyle]} />
      </Animated.View>
      {isActive && <Text style={styles.text}>{getBreathingText()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 240,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#3498DB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  text: {
    marginTop: 24,
    fontSize: 24,
    color: '#2C3E50',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});