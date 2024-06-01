import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';

const ProfileScreen = () => {
  return (
    <ImageBackground 
      source={require('../assets/background/Ellipse3.png')} // Убедитесь, что путь к фоновому изображению корректный
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.profileContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton}>
            <Image 
              source={require('../assets/icons/back.png')} // Убедитесь, что путь к изображению корректный
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Профіль</Text>
          <TouchableOpacity style={styles.editButton}>
            <Image 
              source={require('../assets/icons/edit.png')} // Убедитесь, что путь к изображению корректный
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
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
          <Image 
            source={require('../assets/icons/arrow.png')} // Убедитесь, что путь к изображению корректный
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Налаштування</Text>
          <Image 
            source={require('../assets/icons/arrow.png')} // Убедитесь, что путь к изображению корректный
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Підтримка</Text>
          <Image 
            source={require('../assets/icons/arrow.png')} // Убедитесь, что путь к изображению корректный
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Досягнення</Text>
          <Image 
            source={require('../assets/icons/arrow.png')} // Убедитесь, что путь к изображению корректный
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.premiumButton}>
          <Image
            source={require('../assets/BuyPremiumButton.png')} // Убедитесь, что путь к изображению кнопки корректный
            style={styles.premiumButtonImage}
          />
        </TouchableOpacity>
      </ScrollView>
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
    width: 400, // Задайте ширину и высоту изображения кнопки
    height: 70,
    resizeMode: 'contain', // Сделайте изображение масштабируемым
  },
});

export default ProfileScreen;
