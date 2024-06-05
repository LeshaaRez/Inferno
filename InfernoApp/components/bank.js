import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions, Linking } from 'react-native';
import BankModal from './BankModal';
import HintsModal from './HintsModal';

const ShopScreen = () => {
    const [isBankModalVisible, setIsBankModalVisible] = useState(false);
    const [isHintsModalVisible, setIsHintsModalVisible] = useState(false);

    const handlePurchase = async () => {
        const paymentData = {
            'action': 'pay',
            'amount': '10',
            'currency': 'USD',
            'description': 'Преміум акаунт',
            'order_id': 'order_id_1',
            'version': '3'
        };
        try {
            const response = await fetch('https://your-server.com/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paymentData)
            });
            const result = await response.json();
            if (result.success) {
                Linking.openURL(result.payment_url);
            } else {
                console.error('Payment failed:', result.error);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <ImageBackground source={require('../assets/background/Ellipse3.png')} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButtonContainer}
                    onPress={() => console.log('Back button pressed')}
                >
                    <Text style={styles.backButton}>{'< '}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Магазин</Text>
            </View>
            <TouchableOpacity style={styles.option} onPress={() => setIsBankModalVisible(true)}>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Преміум аккаунт</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.option} onPress={() => setIsHintsModalVisible(true)}>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Додаткові підказки</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </View>
            </TouchableOpacity>
            <BankModal
                visible={isBankModalVisible}
                onClose={() => setIsBankModalVisible(false)}
                handlePurchase={handlePurchase}
            />
            <HintsModal
                visible={isHintsModalVisible}
                onClose={() => setIsHintsModalVisible(false)}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
    },
    backButtonContainer: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'transparent',
        borderRadius: 50,
        padding: 10,
    },
    backButton: {
        fontSize: 24,
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    optionTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    optionText: {
        fontSize: 20,
        color: 'white',
    },
    arrow: {
        fontSize: 24,
        color: 'white',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'white',
        marginVertical: 10,
    },
});

export default ShopScreen;
