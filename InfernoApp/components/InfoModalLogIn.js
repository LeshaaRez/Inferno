import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal, Alert } from 'react-native';
import CustomButton from './CustomButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const InfoModalLogIn = ({ visible, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '274956882933-mlfraac6hed4vsn4pitt3vpndkd80k5p.apps.googleusercontent.com',
        redirectUri: 'com.inferno.infernoapp:/oauthredirect'

    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            handleGoogleLogin(id_token);
        }
    }, [response]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleGoogleLogin = async (idToken) => {
        try {
            const response = await axios.post('http://192.168.31.222:3000/google-login', { idToken });

            if (response.data.success) {
                await AsyncStorage.setItem('userId', response.data.userId.toString());
                Alert.alert('Login Successful', 'You have logged in successfully!', [{ text: 'OK', onPress: () => navigation.navigate('MainScreen') }]);
                onClose();
            } else {
                Alert.alert('Login Failed', 'Google login failed.');
            }
        } catch (error) {
            console.error('Google login error:', error.response ? error.response.data : error.message);
            Alert.alert('Login Error', error.response ? error.response.data.message : 'An error occurred during Google login. Please try again.');
        }
    };

    const handleLogin = async () => {
        const newErrors = {};
        if (!email) newErrors.email = true;
        if (email && !validateEmail(email)) newErrors.emailInvalid = true;
        if (!password) newErrors.password = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        try {
            const response = await axios.post('http://192.168.31.222:3000/login', { email, password });

            if (response.data.success) {
                await AsyncStorage.setItem('userId', response.data.userId.toString());
                Alert.alert('Login Successful', 'You have logged in successfully!', [{ text: 'OK', onPress: () => navigation.navigate('MainScreen') }]);
                onClose();
            } else {
                Alert.alert('Login Failed', 'Invalid email or password.');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            Alert.alert('Login Error', error.response ? error.response.data.message : 'An error occurred during login. Please try again.');
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
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        {/* Optional close icon */}
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
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
                            autoCapitalize="none"
                            keyboardType="email-address"
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
                    </View>
                    <CustomButton 
                        title="Log in"
                        onPress={handleLogin}
                    />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.socialContainer}>
                        <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
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
                            Не маєте акаунту? <Text style={styles.registerLink}>Зареєструйтесь</Text>
                        </Text>
                    </TouchableOpacity>
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
        height: 450,
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    inputContainer: {
        width: '95%',
    },
    input: {
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FFDDC9',
        fontSize: 16,
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
        marginTop: 0.2,
        fontSize: 16,
        color: '#FFA07A',
    },
    socialContainer: {
        flexDirection: 'row',
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
    },
    registerLink: {
        color: '#FF8845',
    },
});

export default InfoModalLogIn;
