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
           <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose}>
                        {/* Здесь можно добавить любую информацию или компоненты */}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
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
        height: 450,
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

});

export default InfoModal;



