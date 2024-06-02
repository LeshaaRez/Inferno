import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, Image } from 'react-native';

const ProfileSettingsModal = ({ visible, onClose, profile }) => {
    const [fullName, setFullName] = useState(profile?.username || '');
    const [email, setEmail] = useState(profile?.email || '');
    const [password, setPassword] = useState('');

    const handleSave = () => {
        // Обработка сохранения данных профиля
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
                <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                    <Text style={styles.modalTitle}>Налаштування профілю</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Повне ім'я</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Повне ім'я"
                            value={fullName}
                            onChangeText={setFullName}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Адреса ел. пошти</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Адреса ел. пошти"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Пароль</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Пароль"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Image 
                            source={require('../assets/profile/editbutton.png')} // Убедитесь, что путь к изображению корректный
                            style={styles.saveButtonImage}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end', // Поднимает модальное окно выше
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%', // Устанавливает ширину модального окна на весь экран
        maxHeight: '100%', // Ограничивает высоту модального окна
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FC9B37',
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        color: 'black',
        marginBottom: 5,
        marginLeft: 5,
    },
    input: {
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        backgroundColor: '#FFDDC9',
    },
    saveButton: {
        alignItems: 'center',
    },
    saveButtonImage: {
        width: 3000, // Убедитесь, что размер кнопки соответствует вашему изображению
        height: 50,
        resizeMode: 'contain',
    },
});

export default ProfileSettingsModal;
