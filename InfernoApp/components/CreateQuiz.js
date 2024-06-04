import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CreateQuizScreen = () => {
    const [questions, setQuestions] = useState([{ id: 1, text: '' }]);

    const addQuestion = () => {
        const newQuestion = { id: questions.length + 1, text: '' };
        setQuestions([...questions, newQuestion]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.backButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Створити</Text>
                <TouchableOpacity>
                    <Text style={styles.doneButton}>✔</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Назва</Text>
                    <TextInput style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Тема</Text>
                    <TextInput style={styles.input} />
                </View>
                <TouchableOpacity style={styles.addMedia}>
                    <Text style={styles.addMediaText}>+ Картинку</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addMedia}>
                    <Text style={styles.addMediaText}>+ Опис</Text>
                </TouchableOpacity>
                {questions.map((question, index) => (
                    <View key={question.id} style={styles.questionContainer}>
                        <Text style={styles.label}>Питання</Text>
                        <TextInput style={styles.input} placeholder="Правильна відповідь" />
                        <TextInput style={styles.input} placeholder="Відповідь 2" />
                        <TextInput style={styles.input} placeholder="Відповідь 3" />
                        <TextInput style={styles.input} placeholder="Відповідь 4" />
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
