import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import InfoModalFilter from './InfoModalFilter';
import axios from 'axios';

const MainScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quizzes, setQuizzes] = useState([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    useEffect(() => {
        axios.get('http://192.168.1.117:3000/quizzes') // Update with your server URL
            .then(response => {
                setQuizzes(response.data);
            })
            .catch(error => {
                console.error('Error fetching quizzes:', error);
            });
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quizzes.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + quizzes.length) % quizzes.length);
    };

    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../assets/background/Ellipse3.png')} 
                style={styles.background}
            >
                <View style={styles.header}>
                    <Image 
                        source={require('../assets/logo_images/INFERNO.png')}
                        style={styles.logo}
                    />
                    <View style={styles.searchContainer}>
                        <Image 
                            source={require('../assets/icons/search.png')} 
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="white"
                        />
                        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                            <Image 
                                source={require('../assets/icons/filter.png')} 
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.carouselContainer}>
                    <TouchableOpacity onPress={handlePrev} style={styles.arrow}>
                        <Text style={styles.arrowText}>{"<"}</Text>
                    </TouchableOpacity>
                    {quizzes.length > 0 && (
                        <Image
                            source={{ uri: quizzes[currentIndex].image_url }}
                            style={styles.quizImage}
                        />
                    )}
                    <TouchableOpacity onPress={handleNext} style={styles.arrow}>
                        <Text style={styles.arrowText}>{">"}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <InfoModalFilter visible={filterModalVisible} onClose={() => setFilterModalVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15,
        paddingHorizontal: 10,
        width: '90%',
        height: 47,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        color: 'white',
        paddingLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    carouselContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 200,
        marginVertical: 20,
    },
    quizImage: {
        width: '70%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
    arrow: {
        paddingHorizontal: 20,
    },
    arrowText: {
        fontSize: 30,
        color: 'white',
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
});

export default MainScreen;
