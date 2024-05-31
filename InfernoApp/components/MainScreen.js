import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';

const MainScreen = () => {
    return (
        <ImageBackground 
            source={require('../assets/background/Ellipse3.png')} 
            style={styles.background}
        >
            <View style={styles.header}>
                <Image 
                    source={require('../assets/logo_images/INFERNO.png')}
                    style={styles.logo}
                />
                <View style={styles.searchContainer}>
                    <Image 
                        source={require('../assets/icons/search.png')} 
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="white"
                    />
                    <Image 
                        source={require('../assets/icons/filter.png')} 
                        style={styles.icon}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Убедитесь, что изображение масштабируется
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50, // Отступ сверху для размещения заголовка
    },
    logo: {
        width: 120, // Уменьшаем ширину изображения
        height: 40, // Уменьшаем высоту изображения
        resizeMode: 'contain',
        marginBottom: 20, // Отступ снизу для логотипа
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15, // Закругляем углы
        paddingHorizontal: 10,
        width: '90%',
        height: 47,
        marginBottom: 20, // Отступ снизу для поиска
    },
    searchInput: {
        flex: 1,
        color: 'white',
        paddingLeft: 10,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: 'white', // Добавим цвет текста, чтобы он был виден на фоне
    },
});

export default MainScreen;

