import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, Image, FlatList } from 'react-native';

const ProfileSettingsModal = ({ visible, onClose, profile }) => {
    const [fullName, setFullName] = useState(profile?.username || '');
    const [email, setEmail] = useState(profile?.email || '');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(require('../assets/profile/profileAvatar/photo1.png'));
    const [imagePickerVisible, setImagePickerVisible] = useState(false);

    const handleSave = () => {
        // Обработка сохранения данных профиля
        onClose();
    };

    const images = [
        require('../assets/profile/profileAvatar/photo1.png'),
        require('../assets/profile/profileAvatar/photo2.png'),
        require('../assets/profile/profileAvatar/photo3.png'),
        require('../assets/profile/profileAvatar/photo4.png'),
    ];

    const handleImagePick = (image) => {
        setProfileImage(image);
        setImagePickerVisible(false);
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
                    <View style={styles.imageContainer}>
                        <View style={styles.profileImageWrapper}>
                            <Image
                                source={profileImage}
                                style={styles.profileImage}
                            />
                        </View>
                        <TouchableOpacity style={styles.editIconContainer} onPress={() => setImagePickerVisible(true)}>
                            <Image
                                source={require('../assets/icons/edit.png')}
                                style={styles.editIcon}
                            />
                        </TouchableOpacity>
                    </View>
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
                        <Text style={styles.saveButtonText}>Підтвердити</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={imagePickerVisible}
                onRequestClose={() => setImagePickerVisible(false)}
            >
                <View style={styles.imagePickerContainer}>
                    <FlatList
                        data={images}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleImagePick(item)}>
                                <Image source={item} style={styles.imageOption} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        key={(imagePickerVisible ? 'picker' : 'list') + (images.length)}
                    />
                </View>
            </Modal>
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
        height: '90%', // Ограничивает высоту модального окна
    },
    modalTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FC9B37',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImageWrapper: {
        width: 150, // Уменьшенный размер
        height: 150, // Уменьшенный размер
        borderRadius: 75, // Половина от width и height для создания круга
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFDDC9',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    editIconContainer: {
        marginLeft: 15, // Отступ слева от картинки
        backgroundColor: '#FC9B37',
        borderRadius: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editIcon: {
        width: 30,
        height: 30,
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
        backgroundColor: '#FC9B37',
        padding: 15,
        borderRadius: 25,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imagePickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    row: {
        justifyContent: 'center',
    },
    imageOption: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 10,
    },
});

export default ProfileSettingsModal;
