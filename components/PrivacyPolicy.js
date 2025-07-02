import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicy({ onClose }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Privacy Policy</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          Zonely Space respects your privacy and is committed to protecting your personal data. This privacy policy explains how we handle your data when you use our app.
        </Text>

        <Text style={styles.sectionTitle}>Data We Don't Collect</Text>
        <Text style={styles.text}>
          • We do not collect any personal information{'\n'}
          • We do not track your usage{'\n'}
          • We do not store any data on external servers{'\n'}
          • We do not use cookies
        </Text>

        <Text style={styles.sectionTitle}>App Permissions</Text>
        <Text style={styles.text}>
          The only permission we use is vibration (haptic feedback) to enhance your meditation experience. This feature can be disabled through your device settings.
        </Text>

        <Text style={styles.sectionTitle}>Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this privacy policy from time to time. Any changes will be reflected in the app with a notification to users.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, please contact us at contact@axra.site
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666666',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#5D6D7E',
    lineHeight: 24,
    marginBottom: 16,
  },
}); 