import React, { useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import CustomButton from './components/CustomButton';
import InfoModalLogIn from './components/InfoModalLogIn';
import InfomodelSignUp from './components/InfomodelSignUp';

const StartScreen = () => {
    const [logInModalVisible, setLogInModalVisible] = useState(false);
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);

    return (
        <ImageBackground source={require('./assets/background/Ellipse3.png')} style={styles.container}>
            <View style={styles.header}>
                {/* Заголовок, если нужно */}
            </View>
            <Image source={require('./assets/logo_images/image2.png')} style={styles.logo} />
            <Image source={require('./assets/logo_images/inferno_text.png')} style={styles.textLogo} />

            <SafeAreaView style={styles.bottomContainer}>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="Sign up"
                        onPress={() => setSignUpModalVisible(true)} // Открытие модального окна для регистрации
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Якщо ви вже зареєстровані
                        <TouchableOpacity onPress={() => setLogInModalVisible(true)}>
                            <Text style={styles.linkText}> Увійдіть</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </SafeAreaView>

            <InfoModalLogIn
                visible={logInModalVisible}
                onClose={() => setLogInModalVisible(false)} // Закрытие модального окна для входа
            />

            <InfomodelSignUp
                visible={signUpModalVisible}
                onClose={() => setSignUpModalVisible(false)} // Закрытие модального окна для регистрации
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
        width: '100%',
        height: 300,
        position: 'relative',
    },
    logo: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        position: 'absolute',
        top: 200,
        left: '50%',
        marginLeft: -125,
    },
    textLogo: {
        position: 'absolute',
        top: 425,
        width: 172,
        height: 43,
        resizeMode: 'contain',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: '0%',
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    linkText: {
        fontSize: 16,
        color: '#FC6636',
    },
});

export default StartScreen;
