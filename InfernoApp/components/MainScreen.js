import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TextInput } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

const MainScreen = () => {
    return (
        <View style={styles.container}>
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
            <BottomTabNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        width: 120,
        height: 40,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 15,
        paddingHorizontal: 10,
        width: '90%',
        height: 47,
        marginBottom: 20,
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
    text: {
        fontSize: 24,
        color: 'white',
    },
});

export default MainScreen;
