import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Alert, Linking, handlePurchase } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect hook
import ProfileSettingsModal from './ProfileSettingsModal';
import InfoModalHelp from './InfoModalHelp';
import ProfileMyQuizzes from './ProfileMyQuizzes';
import SettingsModal from './SettingsModal';
import BankModal from './BankModal'; // Import the BankModal

const avatarImages = {
  'avatar1.png': require('../assets/profile/profileAvatar/photo1.png'),
  'avatar2.png': require('../assets/profile/profileAvatar/photo2.png'),
  'avatar3.png': require('../assets/profile/profileAvatar/photo3.png'),
  'avatar4.png': require('../assets/profile/profileAvatar/photo4.png'),
};

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isQuizzeModalVisible, setIsQuizzeModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isBankModalVisible, setIsBankModalVisible] = useState(false); // State for Bank modal

  const fetchProfile = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in storage');
      }
      const profileResponse = await fetch(`http://192.168.1.7:3000/profile?userId=${userId}`);
      if (!profileResponse.ok) {
        throw new Error(`HTTP error! status: ${profileResponse.status}`);
      }
      const profileResult = await profileResponse.json();
      setProfile(profileResult);

      const premiumResponse = await fetch(`http://192.168.1.7:3000/check-premium?userId=${userId}`);
      if (!premiumResponse.ok) {
        throw new Error(`HTTP error! status: ${premiumResponse.status}`);
      }
      const premiumResult = await premiumResponse.json();
      setIsPremium(premiumResult.premium);
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
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
          <Text style={[styles.profileName, isPremium && styles.premiumName]}>{profile.username}</Text>
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
          <Text style={styles.menuItemText}>Мої вікторини</Text>
          <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Achievements')}>
          <Text style={styles.menuItemText}>Досягнення</Text>
          <Image
            source={require('../assets/icons/arrow.png')}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => setIsSettingsModalVisible(true)}>
          <Text style={styles.menuItemText}>Налаштування</Text>
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
        {!isPremium && (
          <TouchableOpacity style={styles.premiumButton} onPress={() => setIsBankModalVisible(true)}>
            <Image
              source={require('../assets/BuyPremiumButton.png')}
              style={styles.premiumButtonImage}
            />
          </TouchableOpacity>
        )}
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
      <BankModal
        visible={isBankModalVisible}
        onClose={() => setIsBankModalVisible(false)}
        handlePurchase={handlePurchase}
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
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 1, // Adjusted padding
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
  premiumName: {
    color: '#FC3636',
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
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 110,
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
