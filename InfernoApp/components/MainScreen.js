import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

const MainScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to the Main Screen!</Text>
            </View>
            <BottomTabNavigator />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default MainScreen;

