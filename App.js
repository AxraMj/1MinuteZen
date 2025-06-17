import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import BreathingCircle from './components/BreathingCircle';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function App() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  useEffect(() => {
    let timer;
    
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setIsTimerRunning(false);
            setIsCompleted(true);
            // Trigger haptic feedback
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
              .catch(error => console.log('Haptics not available:', error));
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isTimerRunning, timeLeft]);

  const startTimer = async () => {
    setIsTimerRunning(true);
    setIsCompleted(false);
    setTimeLeft(60);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  };

  const resetTimer = async () => {
    setIsTimerRunning(false);
    setIsCompleted(false);
    setTimeLeft(60);
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Haptics not available:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F8FF" />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>1MinuteZen</Text>
          <Text style={styles.subtitle}>Mindful breathing for busy minds</Text>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {isCompleted ? (
            <View style={styles.completedSection}>
              <View style={styles.completedIcon}>
                <Text style={styles.checkmark}>✓</Text>
              </View>
              <Text style={styles.completedTitle}>Well done</Text>
              <Text style={styles.completedMessage}>
                You completed your mindful minute
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={resetTimer}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>Start again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.sessionSection}>
              <BreathingCircle isActive={isTimerRunning} />
              
              <View style={styles.timerSection}>
                <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
                {isTimerRunning && (
                  <Text style={styles.instruction}>Follow the circle</Text>
                )}
              </View>

              <TouchableOpacity
                style={[styles.button, isTimerRunning && styles.buttonDisabled]}
                onPress={startTimer}
                disabled={isTimerRunning}
                activeOpacity={0.7}
              >
                <Text style={styles.buttonText}>
                  {isTimerRunning ? 'In session...' : 'Start'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Privacy Policy Link */}
        <TouchableOpacity
          style={styles.privacyLink}
          onPress={() => setShowPrivacyPolicy(true)}
        >
          <Text style={styles.privacyLinkText}>Privacy Policy</Text>
        </TouchableOpacity>
        
      </SafeAreaView>

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyPolicy}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#5D6D7E',
    fontWeight: '400',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  sessionSection: {
    alignItems: 'center',
    width: '100%',
  },
  completedSection: {
    alignItems: 'center',
    width: '100%',
  },
  completedIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '600',
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  completedMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  timerSection: {
    alignItems: 'center',
    marginVertical: 40,
  },
  timer: {
    fontSize: 48,
    fontWeight: '300',
    color: '#1a1a1a',
    fontVariant: ['tabular-nums'],
    marginBottom: 16,
  },
  instruction: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 25,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  privacyLink: {
    padding: 16,
    alignItems: 'center',
  },
  privacyLinkText: {
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  },
});