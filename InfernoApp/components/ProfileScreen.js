import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook
import ProfileSettingsModal from './ProfileSettingsModal';
import InfoModalHelp from './InfoModalHelp';
import ProfileMyQuizzes from './ProfileMyQuizzes';
import SettingsModal from './SettingsModal';

const avatarImages = {
  'avatar1.png': require('../assets/profile/profileAvatar/photo1.png'),
  'avatar2.png': require('../assets/profile/profileAvatar/photo2.png'),
  'avatar3.png': require('../assets/profile/profileAvatar/photo3.png'),
  'avatar4.png': require('../assets/profile/profileAvatar/photo4.png'),
};

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isQuizzeModalVisible, setIsQuizzeModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const fetchProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in storage');
      }
      const response = await fetch(`http://192.168.31.222:3000/profile?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setProfile(result);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error.toString());
      Alert.alert('Error', error.toString());
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [])
  );

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  const avatarPath = avatarImages[profile.avatar] || require('../assets/profile/profileAvatar/photo1.png');

  return (
    <ImageBackground
      source={require('../assets/background/Ellipse3.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.profileContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton}>
            <Image
              source={require('../assets/icons/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Профіль</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setIsModalVisible(true)}>
            <Image
              source={require('../assets/icons/edit.png')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profileHeader}>
          <Image
            source={avatarPath}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{profile.username}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{profile.achievementsCount}</Text>
              <Text style={styles.statLabel}>досягнень</Text>
            </View>
          </View>
          <View style={styles.stat}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{profile.quizzesCount}</Text>
              <Text style={styles.statLabel}>вікторин</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={() => setIsQuizzeModalVisible(true)}>
          <Text style={styles.menuItemText}>Мої вікторини </Text>
          <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Досягнення</Text>
          <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setIsSettingsModalVisible(true)}>
          <Text style={styles.menuItemText}>Налаштування </Text>
          <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setIsInfoModalVisible(true)}>
          <Text style={styles.menuItemText}>Підтримка</Text>
          <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.premiumButton}>
          <Image
            source={require('../assets/BuyPremiumButton.png')}
            style={styles.premiumButtonImage}
          />
        </TouchableOpacity>
      </ScrollView>
      <ProfileSettingsModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        profile={profile}
        onProfileUpdated={fetchProfile}
      />
      <InfoModalHelp
        visible={isInfoModalVisible}
        onClose={() => setIsInfoModalVisible(false)}
      />
      <ProfileMyQuizzes
        visible={isQuizzeModalVisible}
        onClose={() => setIsQuizzeModalVisible(false)}
      />
      <SettingsModal
        visible={isSettingsModalVisible}
        onClose={() => setIsSettingsModalVisible(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  editButton: {
    padding: 10,
  },
  editIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
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
    marginTop: 1,
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
    padding: 10,
  },
  statBox: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 18,
    color: '#FD6927',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  premiumButton: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  premiumButtonImage: {
    width: 400,
    height: 70,
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
