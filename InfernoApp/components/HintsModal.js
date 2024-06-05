import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Modal } from 'react-native';

const HintsModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.centeredView} onPress={onClose} activeOpacity={1}>
                <View style={styles.hintsModalView}>
                    <Image source={require('../assets/logo_images/helpImage.png')} style={styles.hintsImage} />
                    <Text style={styles.hintsText}>Для отримання додаткових підказок зверніться на наш сайт</Text>
                    <Text style={styles.website}>inferno.com</Text>
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
    hintsModalView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
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
    hintsImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: 25,
    },
    hintsText: {
        fontSize: 18,
        color: '#3D3D3D',
        textAlign: 'center'
    },
    website: {
        fontSize: 18,
        color: '#FD6927',
        marginBottom: 5,
    },
});

export default HintsModal;
