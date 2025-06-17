import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import BreathingCircle from './components/BreathingCircle';

// Main App component
export default function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      setIsCompleted(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Start the timer
  const startTimer = () => {
    setIsTimerRunning(true);
    setIsCompleted(false);
    setTimeLeft(60);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Reset the timer
  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsCompleted(false);
    setTimeLeft(60);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={['#f0f8ff', '#fefae0']}
        start={{ x: 0.4, y: 0.4 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>1MinuteZen</Text>
          <Text style={styles.subtitle}>Take a moment to breathe</Text>
          
          {isCompleted ? (
            <View style={styles.completedContainer}>
              <Text style={styles.completedTitle}>Well Done!</Text>
              <Text style={styles.completedText}>
                You've completed your mindful minute.{'\n'}How do you feel?
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={resetTimer}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Another Minute</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <BreathingCircle isActive={isTimerRunning} />
              <Text style={styles.timerText}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </Text>
              <TouchableOpacity
                style={[styles.button, isTimerRunning && styles.buttonDisabled]}
                onPress={startTimer}
                disabled={isTimerRunning}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {isTimerRunning ? 'Breathe with the Circle' : 'Start Your Zen Minute'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 40,
    fontWeight: '500',
  },
  timerText: {
    fontSize: 48,
    color: '#2C3E50',
    marginVertical: 20,
    fontWeight: '300',
    fontVariant: ['tabular-nums'],
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#BDC3C7',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  completedContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  completedTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#27AE60',
    marginBottom: 16,
  },
  completedText: {
    fontSize: 20,
    color: '#7F8C8D',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 28,
  },
});