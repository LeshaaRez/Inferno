import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';

const QuizScreen = ({ route }) => {
    const { quizId } = route.params;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://192.168.1.117:3000/quiz_questions/${quizId}`);
                if (response.data && Array.isArray(response.data)) {
                    setQuestions(response.data);
                    // Set background image from the first question if available
                    setBackgroundImage(response.data[0]?.background_image_url || null);
                } else {
                    console.error('Received data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [quizId]);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
                // Update background image as we move to the next question
                setBackgroundImage(questions[currentQuestionIndex + 1]?.background_image_url || null);
            }, 1000); // Delay to show the selection for a short period
        } else {
            // Handle quiz completion here
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
            <Text style={styles.questionText}>{currentQuestion.question_text}</Text>
            <View style={styles.answersContainer}>
                {[currentQuestion.correct_answer, currentQuestion.wrong_answer1, currentQuestion.wrong_answer2, currentQuestion.wrong_answer3].map((answer, index) => (
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
        </ImageBackground>
        
    );
};

const styles = StyleSheet.create({

    modalContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 80,
        color: 'white', // Improved visibility on potential dark backgrounds
        textAlign: 'center',
    },
    answersContainer: {
        width: '90%',
        marginBottom: 20,
        
        
    },
    answerButton: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparency for button background
        borderRadius: 35,
        marginBottom: 10,
        height: 55,
        borderColor: '#FC6636', // Добавляем оранжевую границу
        borderWidth: 2, // Ширина границы
    },
    answerText: {
        fontSize: 18,
        textAlign: 'center',
        // color: '#FD6927'
        
    },
    correctAnswer: {
        borderColor: '#2E8F16',
        borderWidth: 6
    },
    wrongAnswer: {
        borderColor: '#FC3636',
        borderWidth: 6
    },
});

export default QuizScreen;