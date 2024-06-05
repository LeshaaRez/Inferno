import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const CreateQuizScreen = () => {
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [questions, setQuestions] = useState([{ id: 1, text: '', answers: ['', '', '', ''], correctAnswer: '' }]);

    const addQuestion = () => {
        const newQuestion = { id: questions.length + 1, text: '', answers: ['', '', '', ''], correctAnswer: '' };
        setQuestions([...questions, newQuestion]);
    };

    const handleSubmit = async () => {
        const formData = {
            title,
            theme,
            description,
            image_url: imageUrl,
            questions
        };

        try {
            const response = await axios.post('http://192.168.1.7:3000/create-quiz', formData);
            console.log('Quiz created successfully:', response.data);
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === index ? { ...question, text: value } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleAnswerChange = (questionIndex, answerIndex, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === questionIndex ? {
                ...question,
                answers: question.answers.map((answer, j) =>
                    j === answerIndex ? value : answer
                ),
            } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === index ? { ...question, correctAnswer: value } : question
        );
        setQuestions(updatedQuestions);
    };

    return (
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
                    <TextInput style={styles.input} value={title} onChangeText={setTitle} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Тема</Text>
                    <TextInput style={styles.input} value={theme} onChangeText={setTheme} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Ссылка на картинку</Text>
                    <TextInput
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={setImageUrl}
                        placeholder="Введите URL картинки"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Опис</Text>
                    <TextInput style={styles.input} value={description} onChangeText={setDescription} />
                </View>
                {questions.map((question, index) => (
                    <View key={question.id} style={styles.questionContainer}>
                        <Text style={styles.label}>Питання</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Текст питання"
                            value={question.text}
                            onChangeText={(value) => handleQuestionChange(index, value)}
                        />
                        {question.answers.map((answer, i) => (
                            <TextInput
                                key={i}
                                style={styles.input}
                                placeholder={`Відповідь ${i+1}`}
                                value={answer}
                                onChangeText={(value) => handleAnswerChange(index, i, value)}
                            />
                        ))}
                        <TextInput
                            style={styles.input}
                            placeholder="Правильна відповідь"
                            value={question.correctAnswer}
                            onChangeText={(value) => handleCorrectAnswerChange(index, value)}
                        />
                    </View>
                ))}
                <TouchableOpacity style={styles.addButton} onPress={addQuestion}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        fontSize: 24,
        color: '#FF6347',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF6347',
    },
    doneButton: {
        marginTop:40,
        fontSize: 24,
        color: '#FF6347',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 18,
        color: '#FF6347',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#FF6347',
        borderRadius: 10,
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
        marginBottom: 20,
        backgroundColor: 'rgba(255, 99, 71, 0.1)',
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

export default CreateQuizScreen;
