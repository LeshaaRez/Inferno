import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import InfoModalFilter from './InfoModalFilter';
import axios from 'axios';

const MainScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [topQuizzes, setTopQuizzes] = useState([]);
    const [bottomQuizzes, setBottomQuizzes] = useState([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);

    useEffect(() => {
        fetchTopQuizzes();
        fetchBottomQuizzes();
    }, []);

    useEffect(() => {
        if (topQuizzes.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % topQuizzes.length);
            }, 5000);

            return () => clearInterval(intervalId);
        }
    }, [topQuizzes]);

    const fetchTopQuizzes = async () => {
        try {
            const response = await axios.get('http://192.168.1.7:3000/quizzes');
            setTopQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching top quizzes:', error);
        }
    };

    const fetchBottomQuizzes = async () => {
        try {
            const response = await axios.get('http://192.168.1.7:3000/quiz');
            setBottomQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching bottom quizzes:', error);
        }
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topQuizzes.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + topQuizzes.length) % topQuizzes.length);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        if (text) {
            const filtered = bottomQuizzes.filter((quiz) => 
                quiz.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredQuizzes(filtered);
        } else {
            setFilteredQuizzes([]);
        }
    };

    const renderQuizzes = (quizzes) => {
        return quizzes.map((quiz, index) => (
            <ImageBackground key={index} source={{ uri: quiz.image_url }} style={styles.quizItem}>
                <View style={styles.quizItemContent}>
                    <Text style={styles.quizItemTitle}>{quiz.title}</Text>
                    <View style={styles.quizItemRatingContainer}>
                        <Text style={styles.quizItemRating}>{quiz.currency_amount}</Text>
                        <Image source={require('../assets/icons/rate.png')} style={styles.quizItemRatingIcon} />
                    </View>
                </View>
            </ImageBackground>
        ));
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
                            value={searchText}
                            onChangeText={handleSearch}
                        />
                        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                            <Image 
                                source={require('../assets/icons/filter.png')} 
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {searchText ? (
                    <ScrollView contentContainerStyle={styles.quizzesContainer}>
                        {renderQuizzes(filteredQuizzes)}
                    </ScrollView>
                ) : (
                    <>
                        <View style={styles.carouselContainer}>
                            <TouchableOpacity onPress={handlePrev} style={styles.arrow}>
                                <Text style={styles.arrowText}>{"<"}</Text>
                            </TouchableOpacity>
                            {topQuizzes.length > 0 && (
                                <Image
                                    source={{ uri: topQuizzes[currentIndex].image_url }}
                                    style={styles.quizImage}
                                />
                            )}
                            <TouchableOpacity onPress={handleNext} style={styles.arrow}>
                                <Text style={styles.arrowText}>{">"}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.indicatorContainer}>
                            {topQuizzes.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.indicator,
                                        { backgroundColor: index === currentIndex ? '#FF6347' : 'white' },
                                    ]}
                                />
                            ))}
                        </View>
                        <Text style={styles.specialText}>Спеціально для вас:</Text>
                        <ScrollView contentContainerStyle={styles.quizzesContainer}>
                            {renderQuizzes(bottomQuizzes)}
                        </ScrollView>
                    </>
                )}
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
        width: '90%',
        height: 200,
        marginVertical: 20,
    },
    quizImage: {
        width: '100%',
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
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    specialText: {
        alignSelf: 'flex-start',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 23,
        color: '#FF6347',
        fontWeight: 'bold',
    },
    quizzesContainer: {
        width: 400,
        paddingHorizontal: 10,
        paddingBottom: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    quizItem: {
        width: '100%',
        height: 100,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
        justifyContent: 'flex-start',
    },
    quizItemContent: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
    },
    quizItemTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    quizItemRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    quizItemRating: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 5,
    },
    quizItemRatingIcon: {
        width: 20,
        height: 24,
    },
});

export default MainScreen;
