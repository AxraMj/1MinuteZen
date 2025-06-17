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
    const handleTimer = async () => {
      if (isTimerRunning && timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setIsTimerRunning(false);
        setIsCompleted(true);
        try {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (error) {
          console.log('Haptics not available:', error);
        }
      }
    };
    
    handleTimer();
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Start the timer
  const startTimer = async () => {
    setIsTimerRunning(true);
    setIsCompleted(false);
    setTimeLeft(60);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  };

  // Reset the timer
  const resetTimer = async () => {
    setIsTimerRunning(false);
    setIsCompleted(false);
    setTimeLeft(60);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#f8fcff', '#fff5e6']}
        start={{ x: 0.5, y: 0.3 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>1MinuteZen</Text>
          <Text style={styles.subtitle}>Mindful breathing for busy minds</Text>
        </View>
        
        <View style={styles.content}>
          {isCompleted ? (
            <View style={styles.completedContainer}>
              <View style={styles.successIcon}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.completedTitle}>Session Complete</Text>
              <Text style={styles.completedText}>
                Well done! You've taken a moment to center yourself.{'\n'}
                How do you feel now?
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={resetTimer}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Start Another Session</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.sessionContainer}>
              <BreathingCircle isActive={isTimerRunning} />
              
              <View style={styles.timerContainer}>
                <Text style={styles.timerLabel}>Time Remaining</Text>
                <Text style={styles.timerText}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </Text>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    isTimerRunning ? styles.primaryButtonDisabled : null
                  ]}
                  onPress={startTimer}
                  disabled={isTimerRunning}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>
                    {isTimerRunning ? 'Session in Progress' : 'Begin Mindful Minute'}
                  </Text>
                </TouchableOpacity>
                
                {isTimerRunning && (
                  <Text style={styles.instructionText}>
                    Follow the breathing circle and let your mind settle
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Take a moment • Breathe deeply • Find your center
          </Text>
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
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  sessionContainer: {
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  timerLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 56,
    color: '#1a365d',
    fontWeight: '200',
    fontVariant: ['tabular-nums'],
    letterSpacing: -2,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
    minWidth: 240,
  },
  primaryButtonDisabled: {
    backgroundColor: '#94a3b8',
    shadowColor: '#94a3b8',
    shadowOpacity: 0.15,
  },
  primaryButtonText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  instructionText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  completedContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  checkmark: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  completedTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  completedText: {
    fontSize: 18,
    color: '#64748b',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});