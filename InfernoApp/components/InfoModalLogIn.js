import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal, Alert } from 'react-native';
import CustomButton from './CustomButton';
import axios from 'axios'; // Ensure you have axios installed
import { useNavigation } from '@react-navigation/native'; // Ensure you have this imported
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

const InfoModalLogIn = ({ visible, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Use useNavigation to get navigation

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '274956882933-mlfraac6hed4vsn4pitt3vpndkd80k5p.apps.googleusercontent.com', // Replace with your Google OAuth client ID
        redirectUri: 'com.inferno.infernoapp:/oauthredirect' // Ensure this matches your scheme
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            // Send the ID token to your server for verification and login
            handleGoogleLogin(id_token);
        }
    }, [response]);

    const handleGoogleLogin = async (idToken) => {
        try {
            const response = await axios.post('http://192.168.1.117:3000/google-login', { idToken });
            if (response.data.success) {
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
        try {
            const response = await axios.post('http://192.168.1.117:3000/login', { email, password });
            if (response.data.success) {
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
                            style={styles.input}
                            placeholder="Адреса ел. пошти"
                            placeholderTextColor="#FF8845"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Пароль"
                            placeholderTextColor="#FF8845"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
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
