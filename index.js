import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import BreathingCircle from './components/BreathingCircle';
import { registerRootComponent } from 'expo';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>1MinuteZen</Text>
        {isCompleted ? (
          <View style={styles.completedContainer}>
            <Text style={styles.completedText}>You're done. Feel better?</Text>
            <TouchableOpacity style={styles.button} onPress={resetTimer}>
              <Text style={styles.buttonText}>Try Again</Text>
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
            >
              <Text style={styles.buttonText}>
                {isTimerRunning ? 'Zen in Progress' : 'Start 1-Minute Zen'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5DC', // Light beige
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  timerText: {
    fontSize: 24,
    color: '#333',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#87CEEB', // Sky blue
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#B0C4DE', // Lighter blue when disabled
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  completedContainer: {
    alignItems: 'center',
  },
  completedText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
});

// Register the app
registerRootComponent(App);