import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import QuizScreenModal from './QuizScreenModal';  // Import the separate modal component
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizScreen = ({ route, navigation }) => {
    const { quizId } = route.params;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [quizTitle, setQuizTitle] = useState('');
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [score, setScore] = useState(0);
    const [userId, setUserId] = useState(null); // Define userId state

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const quizResponse = await axios.get(`http://192.168.1.7:3000/quiz_info/${quizId}`);
                if (quizResponse.data) {
                    setQuizTitle(quizResponse.data.title);
                    const questionsResponse = await axios.get(`http://192.168.1.7:3000/quiz_questions/${quizId}`);
                    if (questionsResponse.data) {
                        setQuestions(questionsResponse.data.map(question => ({
                            ...question,
                            shuffledAnswers: shuffleAnswers([
                                question.correct_answer,
                                question.wrong_answer1,
                                question.wrong_answer2,
                                question.wrong_answer3
                            ])
                        })));
                        setBackgroundImage(questionsResponse.data[0]?.background_image_url || null);
                    }
                }
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchQuizData();
    }, [quizId]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    console.error('User ID not found');
                    return;
                }
                setUserId(userId);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []); 

    const shuffleAnswers = answers => {
        for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
        }
        return answers;
    };

    const handleAnswerSelect = answer => {
        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].correct_answer) {
            setCorrectAnswersCount(correctAnswersCount + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                setBackgroundImage(questions[currentQuestionIndex + 1]?.background_image_url || null);
            }, 1000);
        } else {
            const finalScore = ((correctAnswersCount + (answer === questions[currentQuestionIndex].correct_answer ? 1 : 0)) / questions.length) * 100;
            setScore(finalScore);
            setModalVisible(true);
        }
    };

    if (!questions.length) {
        return <Text>Loading...</Text>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <ImageBackground
            style={styles.container}
            source={{ uri: backgroundImage || undefined }}
            resizeMode="cover"
        >
            <View style={styles.modalContainer}>
                <Text style={styles.quizTitle}>{quizTitle}</Text>
                <Text style={styles.questionText}>{currentQuestion.question_text}</Text>
                <Text style={styles.questionNumber}>{`${currentQuestionIndex + 1}/${questions.length}`}</Text>
                <View style={styles.answersContainer}>
                    {currentQuestion.shuffledAnswers.map((answer, index) => (
                        <TouchableOpacity key={index}
                            style={[
                                styles.answerButton,
                                selectedAnswer === answer && (answer === currentQuestion.correct_answer ? styles.correctAnswer : styles.wrongAnswer)
                            ]}
                            onPress={() => handleAnswerSelect(answer)}
                        >
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            {modalVisible && userId && <QuizScreenModal
                isVisible={modalVisible}
                onModalClose={() => setModalVisible(false)}
                score={score}
                quizId={quizId}
                userId={userId}
                navigation={navigation}
            />}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '100%',
        height: '100%',
       
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    quizTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        
        textAlign: 'center',
        marginBottom: 150,
        marginTop: -50
    },
    questionText: {
        fontSize: 24,
        // fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    questionNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    answersContainer: {
        width: '90%',
        marginBottom: 20,
    },
    answerButton: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 35,
        marginBottom: 10,
        height: 55,
        borderColor: '#FC6636',
        borderWidth: 2,
    },
    answerText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FC6636'
    },
    correctAnswer: {
        borderColor: '#2E8F16',
        borderWidth: 6,
    },
    wrongAnswer: {
        borderColor: '#FC3636',
        borderWidth: 6,
    },
});

export default QuizScreen;
