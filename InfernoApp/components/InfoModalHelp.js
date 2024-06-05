import React from 'react';
import { StyleSheet, View, Image, Modal, TouchableOpacity, Text } from 'react-native';

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
                    <Text style={styles.title}>Підтримка</Text>
                    <Image
                        source={require('../assets/logo_images/helpImage.png')} // Ensure the path to the image is correct
                        style={styles.image}
                    />
                    <Text style={styles.description}>
                        Якщо у вас виникла проблема, ви можете зв'язатися з нами за наступною поштою:
                    </Text>
                    <Text style={styles.email}>inferno@gmail.com</Text>
                    <Text style={styles.websiteText}>Крім того ви можете завітати на наш сайт:</Text>
                    <Text style={styles.website}>inferno.com</Text>
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
        height: '70%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    image: {
        width: 160, // Adjust the size as needed
        height: 240,
        marginBottom: 15,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        color: '#FD6927',
        marginBottom: 10,
    },
    description: {
        fontSize: 19,
        textAlign: 'center',
        marginBottom: 3,
    },
    email: {
        fontSize: 19,
        color: '#FD6927',
        marginBottom: 20,
    },
    websiteText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 4,
        marginTop: 30, // Adjust this value to move the text lower
    },
    website: {
        fontSize: 18,
        color: '#FD6927',
        marginBottom: 5,

    },
});

export default InfoModal;
