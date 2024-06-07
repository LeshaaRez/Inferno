import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AchievementsScreen = ({ navigation }) => {
  const [achievements, setAchievements] = useState([]);
  const [achievementsCount, setAchievementsCount] = useState(0);
  const [quizzesCount, setQuizzesCount] = useState(0);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found');
          return;
        }

        const response = await axios.get(`http://192.168.1.7:3000/achievements?userId=${userId}`);
        setAchievements(response.data);
        setAchievementsCount(response.data.filter(item => item.achieved).length);

        const profileResponse = await axios.get(`http://192.168.1.7:3000/profile?userId=${userId}`);
        setQuizzesCount(profileResponse.data.quizzesCount);
      } catch (error) {
        console.error('Error fetching achievements:', error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <ImageBackground 
      source={require('../assets/background/Ellipse3.png')} 
      style={styles.background}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/icons/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Досягнення</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.countersContainer}>
          <View style={styles.counter}>
            <View style={styles.counterBox}>
              <Text style={styles.counterNumber}>{achievementsCount}</Text>
              <Text style={styles.counterLabel}>досягнень</Text>
            </View>
          </View>
          <View style={styles.counter}>
            <View style={styles.counterBox}>
              <Text style={styles.counterNumber}>{quizzesCount}</Text>
              <Text style={styles.counterLabel}>вікторин</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={achievements}
          keyExtractor={(item) => item.achieve_id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.achievementItem, !item.achieved && styles.unachievedItem]}>
              <View>
                <Text style={[styles.achievementTitle, !item.achieved && styles.unachievedText]}>{item.name}</Text>
                <Text style={[styles.achievementDescription, !item.achieved && styles.unachievedText]}>{item.description}</Text>
              </View>
              <Image 
                source={item.achieved ? require('../assets/profile/achive/check-mark.png') : require('../assets/profile/achive/lock.png')} 
                style={styles.checkIcon} 
              />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 50,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  countersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  counter: {
    alignItems: 'center',
  },
  counterBox: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 120,
  },
  counterNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  counterLabel: {
    fontSize: 16,
    color: 'white',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCAD4A',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
  },
  unachievedItem: {
    backgroundColor: '#FF7549',
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  achievementDescription: {
    fontSize: 14,
    color: 'white',
  },
  unachievedText: {
    color: 'white',
  },
  checkIcon: {
    width: 36, 
    height: 36, 
  },
});

export default AchievementsScreen;
