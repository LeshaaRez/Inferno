// InfoModal.js
import React from 'react';
import { StyleSheet, View, Image, Modal, TouchableOpacity } from 'react-native';

const InfoModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose}>
                        <Image source={require('../assets/window.png')} style={styles.modalImage} />
                    </TouchableOpacity>
                    {/* Здесь можно добавить любую информацию или компоненты */}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalImage: {
        width: 300,
        height: 200,
        resizeMode: 'contain',
    },
});

export default InfoModal;
