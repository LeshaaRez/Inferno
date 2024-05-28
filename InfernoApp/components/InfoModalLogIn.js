// InfoModalLogIn.js
import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Modal } from 'react-native';
import CustomButton from './CustomButton';

const InfoModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        {/* Можно добавить иконку закрытия, если нужно */}
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Адреса ел. пошти"
                            placeholderTextColor="#FF8845"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Пароль"
                            placeholderTextColor="#FF8845"
                            secureTextEntry
                        />
                    </View>
                    <CustomButton 
                    title="Log in"
                    onPress={onClose} />
                    <Text style={styles.orText}>or</Text>
                    <View style={styles.socialContainer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/networks_logo/google.jpg')}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/networks_logo/facebook.jpg')}
                                style={styles.socialIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.registerText}>
                            Не маєте акаунту? <Text style={styles.registerLink}>Зареєструйтесь</Text>
                        </Text>
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
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    inputContainer: {
        width: '95%',
    },
    input: {
        height: 50,
        borderRadius: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: '#FFDDC9',
        fontSize: 16,
    },
    orText: {
        marginTop: 0.2,
        fontSize: 16,
        color: '#FFA07A',
    },
    socialContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    socialIcon: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },
    registerText: {
        marginTop: 20,
        fontSize: 16,
    },
    registerLink: {
        color: '#FF8845',
    },
});

export default InfoModal;
