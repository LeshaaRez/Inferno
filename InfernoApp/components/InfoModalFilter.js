import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity, ScrollView } from 'react-native';

const InfoModalFilter = ({ visible, onClose }) => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);

    const toggleSelection = (list, setList, value) => {
        if (list.includes(value)) {
            setList(list.filter(item => item !== value));
        } else {
            setList([...list, value]);
        }
    };

    const difficultyIcons = {
        easy: require('../assets/icons/easy.png'),
        medium: require('../assets/icons/midle.png'),
        hard: require('../assets/icons/hard.png'),
    };

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
                        <Text style={styles.closeButtonText}>×</Text>
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Text style={styles.title}>Фільтрація</Text>

                        <Text style={styles.sectionTitle}>Тема:</Text>
                        <View style={styles.checkboxGroup}>
                            <View style={styles.checkboxColumn}>
                                {['Природа', 'Ігри', 'Музика', 'Кіно', 'Література'].map((topic) => (
                                    <View key={topic} style={styles.checkboxContainer}>
                                        <TouchableOpacity onPress={() => toggleSelection(selectedTopics, setSelectedTopics, topic)}>
                                            <Image source={selectedTopics.includes(topic) ? require('../assets/icons/checked.png') : require('../assets/icons/unchecked.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <Text style={styles.checkboxLabel}>{topic}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.checkboxColumn}>
                                {['Техніка', 'Наука', 'Спорт'].map((topic) => (
                                    <View key={topic} style={styles.checkboxContainer}>
                                        <TouchableOpacity onPress={() => toggleSelection(selectedTopics, setSelectedTopics, topic)}>
                                            <Image source={selectedTopics.includes(topic) ? require('../assets/icons/checked.png') : require('../assets/icons/unchecked.png')} style={styles.icon} />
                                        </TouchableOpacity>
                                        <Text style={styles.checkboxLabel}>{topic}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Рейтинг:</Text>
                        <View style={styles.ratingGroup}>
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <View key={rating} style={styles.ratingContainer}>
                                    <TouchableOpacity onPress={() => toggleSelection(selectedRatings, setSelectedRatings, rating)}>
                                        <Image source={selectedRatings.includes(rating) ? require('../assets/icons/checked.png') : require('../assets/icons/unchecked.png')} style={styles.icon} />
                                    </TouchableOpacity>
                                    {Array.from({ length: rating }).map((_, index) => (
                                        <Image key={index} source={require('../assets/icons/rate.png')} style={styles.iconFire} />
                                    ))}
                                </View>
                            ))}
                        </View>

                        <Text style={styles.sectionTitle}>Рівень складності:</Text>
                        <View style={styles.difficultyGroup}>
                            {['easy', 'medium', 'hard'].map((difficulty) => (
                                <View key={difficulty} style={styles.checkboxContainer}>
                                    <TouchableOpacity onPress={() => toggleSelection(selectedDifficulties, setSelectedDifficulties, difficulty)}>
                                        <Image source={selectedDifficulties.includes(difficulty) ? require('../assets/icons/checked.png') : require('../assets/icons/unchecked.png')} style={styles.icon} />
                                    </TouchableOpacity>
                                    <Image source={difficultyIcons[difficulty]} style={styles.iconFire} />
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.applyButton} onPress={onClose}>
                            <Text style={styles.applyButtonText}>Застосувати</Text>
                        </TouchableOpacity>
                    </ScrollView>
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
        maxHeight: '80%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 24,
        color: 'black',
    },
    scrollViewContent: {
        alignItems: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
        fontFamily: 'Cagliostro', // Установите шрифт здесь
        color: '#FC6636',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    checkboxGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    checkboxColumn: {
        flex: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginLeft: 10,
    },
    ratingGroup: {
        alignItems: 'flex-start',
        width: '100%',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    difficultyGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    icon: {
        width: 20,
        height: 20,
    },
    iconFire: {
        width: 20,
        height: 25,
        marginLeft: 5,
    },
    applyButton: {
        marginTop: 20,
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    applyButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default InfoModalFilter;
