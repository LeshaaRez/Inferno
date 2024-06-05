import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Modal, Dimensions, Image, Linking } from 'react-native';

const ShopScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
    const [premiumStatus, setPremiumStatus] = useState(false);

    const handlePurchase = async () => { 
        const paymentData = {
            'action'         : 'pay',
            'amount'         : '10',
            'currency'       : 'USD',
            'description'    : 'Преміум акаунт',
            'order_id'       : 'order_id_1',
            'version'        : '3'
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
                // Open the payment form URL in the browser
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
            <TouchableOpacity style={styles.option} onPress={() => setModalVisible(true)}>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Преміум аккаунт</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.line} />
            <TouchableOpacity style={styles.option}>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Додаткові підказки</Text>
                    <Text style={styles.arrow}>{' >'}</Text>
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(false)} activeOpacity={1}>
                    <View style={styles.modalView}>
                        <Image source={require('../assets/bank/moneyfire.png')} style={styles.image} />
                        <Text style={styles.premiumText}>Преміум акаунт</Text>
                        <Text style={styles.priceText}>10$</Text>
                        <Text style={styles.descriptionText}>Він передбачає: необмежену кількість спроб, додаткові підказки, можливість сворювати власні вікторини.</Text>
                        <Text style={styles.paymentText}>{"\n"}Ви можете оплатити за допомогою:</Text>
                        <View style={styles.imagesContainer}>
                            <Image source={require('../assets/bank/monobank.png')} style={styles.paymentImage} />
                            <Image source={require('../assets/bank/osad.png')} style={styles.paymentImage} />
                            <Image source={require('../assets/bank/Privat24_Logo.png')} style={styles.paymentImage} />
                        </View>
                        <TouchableOpacity style={styles.overlayButton} onPress={handlePurchase}>
                            <Text style={styles.overlayButtonText}>Купити</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={purchaseModalVisible}
                onRequestClose={() => {
                    setPurchaseModalVisible(!purchaseModalVisible);
                }}
            >
                <TouchableOpacity style={styles.centeredView} onPress={() => setPurchaseModalVisible(false)} activeOpacity={1}>
                    <View style={styles.modalView}>
                        <Text style={styles.purchaseText}>Ви купили Преміум Акаунт</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
        textAlign: 'center'
    },
    paymentText: {
        fontSize: 18,
        color: '#3D3D3D',
        marginTop: 10,
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },    
    paymentImage: {
        width: '30%',
        height: 50,
        resizeMode: 'contain',
        marginHorizontal: 5,
    },
    overlayButton: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'transparent',
        borderRadius: 50,
        padding: 50,
        paddingHorizontal: 20,
        elevation: 2,
        width: '100%',
    },
    overlayButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24,
    },
    purchaseText: {
        fontSize: 24,
        color: '#FA4D00',
    },
});
export default ShopScreen;
