import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import CustomButton from './components/CustomButton';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="Sign up"
                    onPress={() => alert('Button clicked!')}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Якщо ви вже зареєстровані
                    <TouchableOpacity onPress={() => alert('а теперь мы')}>
                        <Text style={styles.linkText}> Увійдіть</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: '15%',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
        bottom: '25%',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    },
    linkText: {
        color: '#FC6636',

    },
});

export default App;
