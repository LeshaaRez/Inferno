import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const InfoModalQuiz = ({ visible, quiz, onClose }) => {
    if (!quiz) {
        return null;
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalContent}>
                    <Image source={{ uri: quiz.image_url }} style={styles.quizImage} />
                    <Text style={styles.quizTitle}>{quiz.title}</Text>
                    <Text style={styles.quizCreator}>by {quiz.creator}</Text>
                    <View style={styles.ratingContainer}>
                        {Array.from({ length: quiz.rating }).map((_, index) => (
                            <Image key={index} source={require('../assets/icons/rate.png')} style={styles.ratingIcon} />
                        ))}
                    </View>
                    <Text style={styles.quizDescription}>{quiz.description}</Text>
                    <TouchableOpacity style={styles.startButton} onPress={() => {/* Add your start quiz logic here */}}>
                        <Image source={require('../assets/button.png')} style={styles.buttonImage} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        alignItems: 'center',
        height: '60%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    quizImage: {
        width: '90%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
    },
    quizTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    quizCreator: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    ratingIcon: {
        width: 20,
        height: 24,
        margin: 5,
    },
    quizDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    startButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonImage: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
});

export default InfoModalQuiz;
