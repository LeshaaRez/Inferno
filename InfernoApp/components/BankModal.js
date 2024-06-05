import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, Dimensions, Linking, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BankModal = ({ visible, onClose, token }) => {
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        const checkPremiumStatus = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found in storage');
                }
                const response = await fetch(`http://192.168.1.7:3000/check-premium?userId=${userId}`);
                const result = await response.json();
                setIsPremium(result.premium);
            } catch (error) {
                console.error('Error checking premium status:', error);
            }
        };

        checkPremiumStatus();
    }, []);

    const handlePurchase = async (bank) => {
        const paymentData = {
            amount: 1000, // Сумма в копейках (10 USD = 1000 копеек)
            currency: 'UAH', // Установите правильную валюту
            merchantPaymInfo: {
                reference: 'Преміум акаунт',
            },
        };
        try {
            const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
                method: 'POST',
                headers: {
                    'X-Token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });
            const result = await response.json();
            if (result.pageUrl) {
                // Open the payment form URL in the browser
                Linking.openURL(result.pageUrl);
            } else {
                console.error('Payment failed:', result.errText);
            }
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <Image source={require('../assets/bank/moneyfire.png')} style={styles.image} />
                            <Text style={styles.premiumText}>Преміум акаунт</Text>
                            <Text style={styles.priceText}>10$</Text>
                            <Text style={styles.descriptionText}>Він передбачає: необмежену кількість спроб, додаткові підказки, можливість сворювати власні вікторини.</Text>
                            {isPremium ? (
                                <Text style={styles.paymentText}>Ви вже купили преміум акаунт</Text>
                            ) : (
                                <>
                                    <Text style={styles.paymentText}>{"\n"}Ви можете оплатити за допомогою:</Text>
                                    <View style={styles.imagesContainer}>
                                        <TouchableOpacity onPress={() => handlePurchase('monobank')}>
                                            <Image source={require('../assets/bank/monobank.png')} style={styles.paymentImage} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handlePurchase('oschad')}>
                                            <Image source={require('../assets/bank/osad.png')} style={styles.paymentImage} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handlePurchase('privat24')}>
                                            <Image source={require('../assets/bank/Privat24_Logo.png')} style={styles.paymentImage} />
                                        </TouchableOpacity>
                                    </View>
                                </>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 1.4,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: '80%',
        height: '40%',
        resizeMode: 'contain',
    },
    premiumText: {
        fontSize: 24,
        color: '#FA4D00',
    },
    priceText: {
        fontSize: 24,
        color: '#FA4D00',
    },
    descriptionText: {
        fontSize: 18,
        color: '#3D3D3D',
        textAlign: 'center',
    },
    paymentText: {
        fontSize: 18,
        color: '#FA4D00',
        marginTop: 90,
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    paymentImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
});

export default BankModal;
