// ProfileScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: 'https://path-to-your-image.png' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Cat</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>150</Text>
          <Text style={styles.statLabel}>досягнень</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>100</Text>
          <Text style={styles.statLabel}>вікторин</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Мої вікторини</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Налаштування</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Підтримка</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuItemText}>Досягнення</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.premiumButton}>
        <Text style={styles.premiumButtonText}>Buy Premium</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFA500',
    flex: 1
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 16,
    color: 'white',
  },
  menuItem: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  menuItemText: {
    fontSize: 18,
    color: 'white',
  },
  premiumButton: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  premiumButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
  },
});

export default ProfileScreen;
