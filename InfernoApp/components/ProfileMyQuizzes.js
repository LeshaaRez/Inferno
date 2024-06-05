import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileMyQuizzes = ({ visible, onClose }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (visible) {
      fetchQuizzes();
    }
  }, [visible]);

  const fetchQuizzes = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const response = await axios.get(`http://192.168.31.222:3000/my-quizzes?userId=${userId}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  /*const calculateScorePercentage = (score, totalQuestions) => {
    return Math.round((score / totalQuestions) * 100);
  };*/

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Мої вікторини</Text>
              <FlatList
                data={quizzes}
                renderItem={({ item }) => (
                  <View style={styles.quizItem}>
                    <Image source={{ uri: item.image_url }} style={styles.quizImage} />
                    <View style={styles.quizInfo}>
                      <Text style={styles.quizTitle}>{item.title}</Text>
                      <Text style={styles.quizScore}>{item.score}%</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.quiz_id.toString()}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '70%', // Устанавливаем максимальную высоту
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FC9B37',
  },
  quizItem: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  quizImage: {
    width: '100%',
    height: 100,
  },
  quizInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  quizScore: {
    fontSize: 26,
    color: 'white',
    textAlign: 'right',
    textShadowColor: '#FC9B37',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});

export default ProfileMyQuizzes;
