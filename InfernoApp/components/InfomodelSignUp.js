import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal, ScrollView } from 'react-native';
import axios from 'axios';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native'; // Импортируем useNavigation

const InfomodelSignUp = ({ visible, onClose }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [greeting, setGreeting] = useState('');
    const navigation = useNavigation(); // Используем useNavigation для получения навигации

    const handleSignUp = () => {
        axios.post('http://192.168.1.7:3000/signup', { // Замените на ваш фактический IP-адрес
            fullName,
            email,
            password,
        })
            .then(response => {
                setGreeting(`Hi, ${fullName}`);
                onClose();
                navigation.navigate('MainScreen'); // Переход на главную страницу
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {greeting ? (
                            <Text style={styles.greeting}>{greeting}</Text>
                        ) : (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Повне ім'я"
                                    placeholderTextColor="#FF8845"
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Адреса ел. пошти"
                                    placeholderTextColor="#FF8845"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Пароль"
                                    placeholderTextColor="#FF8845"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <CustomButton title="Sign up" onPress={handleSignUp} />
                                <Text style={styles.orText}>or</Text>
                                <View style={styles.socialContainer}>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../assets/networks_logo/google.jpg')}
                                            style={styles.socialIcon}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image
                                            source={require('../assets/networks_logo/facebook.jpg')}
                                            style={styles.socialIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity>
                                    <Text style={styles.registerText}>
                                        Вже маєте акаунт? <Text style={styles.registerLink}>Увійдіть</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
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
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 30,
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    inputContainer: {
        width: '95%',
        alignItems: 'center', // Централизует элементы внутри
    },
    input: {
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FFDDC9',
        fontSize: 16,
        width: '100%', // Устанавливает ширину инпута в 100% от родительского элемента
    },
    orText: {
        marginTop: 20,
        fontSize: 16,
        color: '#FFA07A',
        textAlign: 'center', // Централизует текст
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Централизует значки по горизонтали
        marginTop: 20,
    },
    socialIcon: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },
    registerText: {
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center', // Централизует текст
    },
    registerLink: {
        color: '#FF8845',
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FF8845',
        marginVertical: 20,
        textAlign: 'center', // Централизует текст
    },
});

export default InfomodelSignUp;
