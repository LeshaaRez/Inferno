import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, Button } from 'react-native';
import axios from 'axios';
import highScoreImage from '../assets/happy.jpg';  // Correct path
import lowScoreImage from '../assets/sad.jpg';    // Correct path

const QuizScreenModal = ({ isVisible, onModalClose, score, quizId, userId, navigation }) => {
    const [rating, setRating] = useState(0);

    const handleQuizFinish = async () => {
        console.log('Sending data to server:', { userId, quizId, score, rating }); // Log data to debug
        try {
            const response = await axios.post('http://192.168.1.117:3000/save_result', {
                userId,
                quizId,
                score,
                rating
            });
            console.log('Server response:', response.data); // Log server response
            onModalClose();
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainScreen' }],
            });
        } catch (error) {
            console.error('Error saving quiz result:', error.response ? error.response.data : error);
        }
    };

    const isHighScore = score > 50; 
    const resultText = isHighScore ? 'Молодець!' : 'Можна краще';
    const resultImage = isHighScore ? highScoreImage : lowScoreImage;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            
        >
            <TouchableOpacity style={styles.modalContainer}  activeOpacity={1}>
                <View style={styles.modalContent}>
                    <Image source={resultImage} style={styles.resultImage} />
                    <Text style={styles.resultText}>{`${Math.round(score)}% ${resultText}`}</Text>
                    <TouchableOpacity style={styles.startButton}
                            onPress={handleQuizFinish}
                            
                            >
                                <Image source={require('../assets/but.jpg')} style={styles.buttonImage} />
                                
                                <Text style={styles.buttonText}></Text>
                            </TouchableOpacity>
                    <Text style={styles.ratingText}>Оцініть пройдену вікторину:</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                <Text style={rating >= star ? styles.selectedStar : styles.star}>🔥</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.sofiia} >Крім того, ви можете завітати на наш сайт та прочитати про дану тему: <Text style={styles.link}>inferno.com</Text></Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    buttonImage: {
        width: 300,
        height: 70,
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
        height: 550,
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    resultImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    resultText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FD6927'
    },
    ratingText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#3D3D3D'
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        fontSize: 30,
        marginHorizontal: 5,
        paddingBottom:50
    },
    selectedStar: {
        fontSize: 30,
        marginHorizontal: 5,
        color: '#FC6636',
    },
    link: {
        color: '#FD6927',
    },
    sofiia:{
         color: '#3D3D3D'
    }
});

export default QuizScreenModal;
