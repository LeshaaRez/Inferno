import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const InfoModalQuizInfo = ({ visible, quizId, onClose }) => {
    const [quizInfo, setQuizInfo] = useState(null);

    useEffect(() => {
        if (quizId) {
            console.log(`Fetching info for quizId: ${quizId}`);
            fetchQuizInfo(quizId);
        }
    }, [quizId]);

    const fetchQuizInfo = async (id) => {
        try {
            const response = await axios.get(`http://192.168.1.7:3000/quiz_info/${id}`);
            setQuizInfo(response.data);
        } catch (error) {
            console.error('Error fetching quiz info:', error);
        }
    };

    if (!quizInfo) {
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
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Закрыть</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{quizInfo.title}</Text>
                    <Image source={{ uri: quizInfo.image_url }} style={styles.quizImage} />
                    <Text style={styles.modalText}>{quizInfo.description}</Text>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#FF6347',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    quizImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default InfoModalQuizInfo;
