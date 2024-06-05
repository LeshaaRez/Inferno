import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';

const BankModal = ({ visible, onClose, handlePurchase }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.centeredView} onPress={onClose} activeOpacity={1}>
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
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
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
        backgroundColor: '#FA4D00',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 2,
        width: '100%',
    },
    overlayButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
});

export default BankModal;
