import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ScrollView } from 'react-native';
import axios from 'axios';

const InfoModalQuizInfo = ({ visible, quizId, onClose, navigation}) => {
    const [quizInfo, setQuizInfo] = useState(null);

    useEffect(() => {
        if (quizId) {
            console.log(`Fetching info for quizId: ${quizId}`);
            fetchQuizInfo(quizId);
        }
    }, [quizId]);

    const fetchQuizInfo = async (id) => {
        try {
            const response = await axios.get(`http://192.168.1.117:3000/quiz_info/${id}`);
            setQuizInfo(response.data);
        } catch (error) {
            console.error('Error fetching quiz info:', error);
        }
    };

    if (!quizInfo) {
        return null;
    }

    const renderRating = () => {
        const ratingIcons = [];
        for (let i = 0; i <= (quizInfo.currency_amount || 0); i++) {
            ratingIcons.push(
                <Image
                    key={i}
                    source={require('../assets/icons/rate.png')}
                    style={styles.ratingIcon}
                />
            );
        }
        return ratingIcons;
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={onClose}>
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: quizInfo.image_url }} style={styles.quizImage} />
                            </View>
                            <Text style={styles.modalTitle}>{quizInfo.title}</Text>
                            <Text style={styles.modalSubtitle}>by Inferno</Text>
                            <View style={styles.ratingContainer}>{renderRating()}</View>
                            <Text style={styles.modalText}>{quizInfo.description}</Text>
                            <TouchableOpacity style={styles.startButton}
                            onPress={() => {
                                onClose(); 
                                    navigation.navigate('QuizScreen', { quizId });
                                 }}
                            
                            >
                                <Image source={require('../assets/button.png')} style={styles.buttonImage} />
                                
                                <Text style={styles.buttonText}>Почати</Text>
                            </TouchableOpacity>
                            <Text style={styles.footerText}>
                                Крім того ви можете завітати на наш сайт та прочитати про дану тему:
                                <Text style={styles.linkText}> inferno.com</Text>
                            </Text>
                        </ScrollView>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    imageContainer: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 30,
    },
    quizImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    modalSubtitle: {
        fontSize: 18,
        color: '#FF6347',
        marginBottom: 10,
        textAlign: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    ratingIcon: {
        width: 20,
        height: 24,
        marginHorizontal: 2,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonText: {
        position: 'absolute',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center', 
    },
    startButton: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center', 
        width: 200, 
        height: 50, 
    },
    buttonImage: {
        resizeMode: 'stretch', // изменено
    },
    footerText: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        color: 'gray',
    },
    linkText: {
        color: '#FF6347',
        fontWeight: 'bold',
    },
});

export default InfoModalQuizInfo;
