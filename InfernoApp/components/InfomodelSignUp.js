import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native'; // Импортируем useNavigation
import Icon from 'react-native-vector-icons/MaterialIcons'; // Импортируем иконки
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfomodelSignUp = ({ visible, onClose }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [greeting, setGreeting] = useState('');
    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Состояние для видимости пароля
    const navigation = useNavigation(); // Используем useNavigation для получения навигации

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async () => {
        const newErrors = {};
        if (!fullName) newErrors.fullName = true;
        if (!email) newErrors.email = true;
        if (email && !validateEmail(email)) newErrors.emailInvalid = true;
        if (!password) newErrors.password = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await axios.post('http://192.168.1.7:3000/signup', { // Замените на ваш фактический IP-адрес
                fullName,
                email,
                password,
            });

            if (response.data.userId) {
                await AsyncStorage.setItem('userId', response.data.userId.toString());
                setGreeting(`Hi, ${fullName}`);
                onClose();
                navigation.navigate('MainScreen'); // Переход на главную страницу
            } else {
                Alert.alert('Registration Failed', 'An error occurred during registration.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Registration Error', error.message);
        }
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
                                    style={[styles.input, errors.fullName && styles.inputError]}
                                    placeholder="Повне ім'я"
                                    placeholderTextColor="#FF8845"
                                    value={fullName}
                                    onChangeText={text => {
                                        setFullName(text);
                                        if (text) setErrors(prev => ({ ...prev, fullName: false }));
                                    }}
                                />
                                <TextInput
                                    style={[
                                        styles.input,
                                        (errors.email || errors.emailInvalid) && styles.inputError
                                    ]}
                                    placeholder="Адреса ел. пошти"
                                    placeholderTextColor="#FF8845"
                                    value={email}
                                    onChangeText={text => {
                                        setEmail(text);
                                        if (text) setErrors(prev => ({ ...prev, email: false, emailInvalid: false }));
                                    }}
                                />
                                {errors.emailInvalid && (
                                    <Text style={styles.errorText}>Некоректний формат ел. пошти</Text>
                                )}
                                <View style={[styles.input, styles.passwordContainer, errors.password && styles.inputError]}>
                                    <TextInput
                                        style={styles.passwordInput}
                                        placeholder="Пароль"
                                        placeholderTextColor="#FF8845"
                                        secureTextEntry={!isPasswordVisible}
                                        value={password}
                                        onChangeText={text => {
                                            setPassword(text);
                                            if (text) setErrors(prev => ({ ...prev, password: false }));
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={styles.passwordToggle}
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        <Icon name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={24} color="#FF8845" />
                                    </TouchableOpacity>
                                </View>
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
        marginBottom: 5, // Уменьшенный отступ
        backgroundColor: '#FFDDC9',
        fontSize: 16,
        width: '100%', // Устанавливает ширину инпута в 100% от родительского элемента
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFDDC9',
        borderRadius: 20,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    passwordToggle: {
        marginLeft: 10,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        marginBottom: 15, // Уменьшенный отступ
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
