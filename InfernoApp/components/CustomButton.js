// components/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ImageBackground } from 'react-native';

const CustomButton = ({ onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <ImageBackground
                source={require('../assets/button.png')}
                style={styles.background}
                imageStyle={styles.image}
            >
                <Text style={styles.text}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        overflow: 'hidden',
        width: 350,
        height: 120,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 25,
    },
    text: {
        color: 'white',
        fontSize: 24, // увеличиваем размер текста
        textAlign: 'center',
        position: 'absolute', // абсолютное позиционирование
        top: '50%', // вертикальное центрирование
        left: '50%', // горизонтальное центрирование
        transform: [{ translateX: -35 }, { translateY: -40 }],
    },
});

export default CustomButton;
