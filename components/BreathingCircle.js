import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

export default function BreathingCircle({ isActive }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);
  const animationStartTime = useRef(null);

  // Animated styles
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const innerCircleStyle = useAnimatedStyle(() => ({
    opacity: 0.3,
  }));

  useEffect(() => {
    if (isActive) {
      animationStartTime.current = Date.now();
      
      // 4-4-4-4 breathing cycle (16 seconds total)
      scale.value = withRepeat(
        withSequence(
          // Inhale (4 seconds)
          withTiming(1.4, {
            duration: 4000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          // Hold (4 seconds)
          withTiming(1.4, {
            duration: 4000,
            easing: Easing.linear,
          }),
          // Exhale (4 seconds)
          withTiming(1, {
            duration: 4000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          // Hold (4 seconds)
          withTiming(1, {
            duration: 4000,
            easing: Easing.linear,
          })
        ),
        -1,
        false
      );

      // Subtle opacity animation
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 4000 }),
          withTiming(0.9, { duration: 4000 }),
          withTiming(1, { duration: 4000 }),
          withTiming(0.9, { duration: 4000 })
        ),
        -1,
        false
      );
    } else {
      // Cancel animations properly to prevent the error
      cancelAnimation(scale);
      cancelAnimation(opacity);
      
      // Reset to initial state
      scale.value = withTiming(1, { 
        duration: 500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
      });
      opacity.value = withTiming(0.8, { 
        duration: 500 
      });
      
      animationStartTime.current = null;
    }

    // Cleanup function
    return () => {
      if (!isActive) {
        cancelAnimation(scale);
        cancelAnimation(opacity);
      }
    };
  }, [isActive, scale, opacity]);

  // Get current breathing phase
  const getBreathingPhase = () => {
    if (!isActive || !animationStartTime.current) return '';
    
    const elapsed = (Date.now() - animationStartTime.current) % 16000;
    const seconds = elapsed / 1000;
    
    if (seconds < 4) return 'Breathe in';
    if (seconds < 8) return 'Hold';
    if (seconds < 12) return 'Breathe out';
    return 'Hold';
  };

  return (
    <View style={styles.container}>
      <Animated.View
        testID="breathing-circle"
        style={[styles.outerCircle, circleStyle]}
      >
        <Animated.View style={[styles.innerCircle, innerCircleStyle]} />
      </Animated.View>
      
      {isActive && (
        <Text style={styles.phaseText}>
          {getBreathingPhase()}
        </Text>
      )}
      
      {!isActive && (
        <Text style={styles.readyText}>
          Ready to breathe
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  outerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
  },
  phaseText: {
    marginTop: 32,
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '500',
    textAlign: 'center',
  },
  readyText: {
    marginTop: 32,
    fontSize: 16,
    color: '#666666',
    fontWeight: '400',
    textAlign: 'center',
  },
});