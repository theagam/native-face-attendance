import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header/Header';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const actions = [
    {
      id: 1,
      title: 'Users',
      subtitle: 'Register new employee',
      icon: '👤',
      color: '#4F46E5',
      screen: 'Users',
    },
    {
      id: 2,
      title: 'Mark Attendance',
      subtitle: 'Take photo for attendance',
      icon: '📸',
      color: '#16A34A',
      screen: 'Attendance',
    },
    {
      id: 3,
      title: 'View Report',
      subtitle: 'Check attendance records',
      icon: '📊',
      color: '#0EA5E9',
      screen: 'Report',
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="Home" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.welcome}>Welcome 👋</Text>
        <Text style={styles.subtitle}>Choose an action to continue</Text>

        <View style={styles.grid}>
          {actions.map(item => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.85}
              style={[styles.card, { backgroundColor: item.color }]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  content: {
    padding: 16,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },

  grid: {
    gap: 14,
  },

  card: {
    borderRadius: 18,
    padding: 18,

    // Shadow iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android elevation
    elevation: 4,
  },

  icon: {
    fontSize: 28,
    marginBottom: 8,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  sub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
  },
});
