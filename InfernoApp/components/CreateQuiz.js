import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from './CustomAlert';

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [questions, setQuestions] = useState([
        { id: 1, text: '', correctAnswer: '', incorrectAnswers: ['', '', ''] },
        { id: 2, text: '', correctAnswer: '', incorrectAnswers: ['', '', ''] },
        { id: 3, text: '', correctAnswer: '', incorrectAnswers: ['', '', ''] }
    ]);
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    const navigation = useNavigation();

    useEffect(() => {
        const checkPremiumStatus = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in storage');
                }
                const response = await axios.get(`http://192.168.1.7:3000/check-premium?userId=${userId}`);
                setIsPremium(response.data.premium);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError(error.toString());
                Alert.alert('Error', error.toString());
                setLoading(false);
            }
        };

        checkPremiumStatus();
    }, []);

    const addQuestion = () => {
        const newQuestion = { id: questions.length + 1, text: '', correctAnswer: '', incorrectAnswers: ['', '', ''] };
        setQuestions([...questions, newQuestion]);
    };

    const validateFields = () => {
        let isValid = true;
        let newErrors = {};

        if (!title) {
            isValid = false;
            newErrors.title = 'Назва не може бути порожньою';
        }

        if (!theme) {
            isValid = false;
            newErrors.theme = 'Тема не може бути порожньою';
        }

        if (!description) {
            isValid = false;
            newErrors.description = 'Опис не може бути порожнім';
        }

        if (!imageUrl) {
            isValid = false;
            newErrors.imageUrl = 'Посилання на картинку не може бути порожньою';
        }

        if (questions.length < 5) {
            isValid = false;
            newErrors.questions = 'Має бути щонайменше 5 питань';
        }

        questions.forEach((question, index) => {
            if (!question.text) {
                isValid = false;
                newErrors[`question${index}`] = 'Текст питання не може бути порожнім';
            }
            if (!question.correctAnswer) {
                isValid = false;
                newErrors[`correctAnswer${index}`] = 'Правильна відповідь не може бути порожньою';
            }
            question.incorrectAnswers.forEach((answer, i) => {
                if (!answer) {
                    isValid = false;
                    newErrors[`incorrectAnswer${index}${i}`] = `Неправильна відповідь ${i + 1} не може бути порожньою`;
                }
            });
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validateFields()) {
            return;
        }

        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            Alert.alert('Error', 'User ID not found in storage');
            return;
        }

        const formData = {
            title,
            theme,
            description,
            image_url: imageUrl,
            questions,
            user_id: userId // Include the user ID in the form data
        };

        try {
            const response = await axios.post('http://192.168.1.7:3000/create-quiz', formData);
            console.log('Quiz created successfully:', response.data);
            // Clear the form fields
            setTitle('');
            setTheme('');
            setDescription('');
            setImageUrl('');
            setQuestions([
                { id: 1, text: '', correctAnswer: '', incorrectAnswers: ['', '', ''] },
                { id: 2, text: '', correctAnswer: '', incorrectAnswers: ['', '', ''] },
                { id: 3, text: '', correctAnswer: '', incorrectAnswers: ['', '', ''] }
            ]);
            setErrors({});

            Alert.alert('Success', 'Вікторина успішно додана', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Main')
                }
            ]);
        } catch (error) {
            console.error('Error creating quiz:', error);
            Alert.alert('Error', 'Error creating quiz');
        }
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === index ? { ...question, text: value } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === index ? { ...question, correctAnswer: value } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleIncorrectAnswerChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === questionIndex ? {
                ...question,
                incorrectAnswers: question.incorrectAnswers.map((answer, j) =>
                    j === answerIndex ? value : answer
                ),
            } : question
        );
        setQuestions(updatedQuestions);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
        );
    }

    if (!isPremium) {
        return (
            <ImageBackground
                source={require('../assets/background/Ellipse3.png')}
                style={styles.background}
            >
                <View style={styles.premiumContainer}>
                    <Text style={styles.premiumAlert}>
                        На жаль, ви не маєте преміум-акаунту.
                        Для створення власної вікторини, перейдіть у вкладку “Магазин” та придбайте опцію “Преміум акаунт”
                    </Text>
                </View>
            </ImageBackground>
        );
    }

    return (
        <ImageBackground
            source={require('../assets/background/Ellipse3.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.backButton}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Створити</Text>
                    <TouchableOpacity onPress={handleSubmit}>
                        <Text style={styles.doneButton}>✔</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Назва</Text>
                        <TextInput
                            style={[styles.input, errors.title && styles.inputError]}
                            value={title}
                            onChangeText={setTitle}
                        />
                        {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Тема</Text>
                        <TextInput
                            style={[styles.input, errors.theme && styles.inputError]}
                            value={theme}
                            onChangeText={setTheme}
                        />
                        {errors.theme && <Text style={styles.errorText}>{errors.theme}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Посилання на зображення</Text>
                        <TextInput
                            style={[styles.input, errors.imageUrl && styles.inputError]}
                            value={imageUrl}
                            onChangeText={setImageUrl}
                            placeholder="Введіть URL зображення"
                            placeholderTextColor="#ddd"
                        />
                        {errors.imageUrl && <Text style={styles.errorText}>{errors.imageUrl}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Опис</Text>
                        <TextInput
                            style={[styles.input, errors.description && styles.inputError]}
                            value={description}
                            onChangeText={setDescription}
                        />
                        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                    </View>
                    {errors.questions && <Text style={styles.errorText}>{errors.questions}</Text>}
                    {questions.map((question, index) => (
                        <View key={question.id} style={styles.questionContainer}>
                            <Text style={styles.questionLabel}>Питання</Text>
                            <TextInput
                                style={[styles.questionInput, errors[`question${index}`] && styles.inputError]}
                                placeholder="Текст питання"
                                placeholderTextColor="#ddd"
                                value={question.text}
                                onChangeText={(value) => handleQuestionChange(index, value)}
                            />
                            {errors[`question${index}`] && <Text style={styles.errorText}>{errors[`question${index}`]}</Text>}
                            <TextInput
                                style={[styles.questionInput, errors[`correctAnswer${index}`] && styles.inputError]}
                                placeholder="Правильна відповідь"
                                placeholderTextColor="#ddd"
                                value={question.correctAnswer}
                                onChangeText={(value) => handleCorrectAnswerChange(index, value)}
                            />
                            {errors[`correctAnswer${index}`] && <Text style={styles.errorText}>{errors[`correctAnswer${index}`]}</Text>}
                            {question.incorrectAnswers.map((answer, i) => (
                                <TextInput
                                    key={i}
                                    style={[styles.questionInput, errors[`incorrectAnswer${index}${i}`] && styles.inputError]}
                                    placeholder={`Неправильна відповідь ${i + 1}`}
                                    placeholderTextColor="#ddd"
                                    value={answer}
                                    onChangeText={(value) => handleIncorrectAnswerChange(index, i, value)}
                                />
                            ))}
                            {question.incorrectAnswers.map((answer, i) => (
                                errors[`incorrectAnswer${index}${i}`] && <Text key={i} style={styles.errorText}>{errors[`incorrectAnswer${index}${i}`]}</Text>
                            ))}
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
    },
    loadingText: {
        fontSize: 18,
        color: '#FF6347',
    },
    premiumContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    premiumAlert: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 99, 71, 0.7)',
        padding: 20,
        borderRadius: 40,
    },
    container: {
        flex: 1,
        width: '100%',
        padding: 20,
    },
    header: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        fontSize: 24,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    doneButton: {
        fontSize: 24,
        color: '#fff',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
        color: '#fff',
    },
    label: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        color: '#fff',
    },
    inputError: {
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    errorText: {
        color: 'red',
        marginTop: -10,
        marginBottom: 10,
    },
    addMedia: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#FF6347',
        borderRadius: 10,
        marginBottom: 10,
    },
    addMediaText: {
        color: '#fff',
        fontSize: 18,
    },
    questionContainer: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#FF6347',
        borderRadius: 10,
        marginBottom: 70,
        backgroundColor: 'rgba(255, 99, 71, 0.3)',
    },
    questionLabel: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    questionInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        color: '#fff',
    },
    addButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30,
        marginBottom: 45,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 36,
        lineHeight: 36,
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

export default CreateQuiz;
