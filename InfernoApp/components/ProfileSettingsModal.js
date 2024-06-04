import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, Image, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSettingsModal = ({ visible, onClose, profile, onProfileUpdated }) => {
    const images = [
        { source: require('../assets/profile/profileAvatar/photo1.png'), path: 'avatar1.png' },
        { source: require('../assets/profile/profileAvatar/photo2.png'), path: 'avatar2.png' },
        { source: require('../assets/profile/profileAvatar/photo3.png'), path: 'avatar3.png' },
        { source: require('../assets/profile/profileAvatar/photo4.png'), path: 'avatar4.png' },
    ];

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(images[0].source); // Default image
    const [profileImagePath, setProfileImagePath] = useState('avatar1.png');
    const [imagePickerVisible, setImagePickerVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ fullName: '', email: '', password: '' });

    useEffect(() => {
        if (profile) {
            setFullName(profile.username || '');
            setEmail(profile.email || '');
            setPassword(profile.password || '');

            const currentImage = images.find(image => image.path === profile.avatar);
            if (currentImage) {
                setProfileImage(currentImage.source);
                setProfileImagePath(currentImage.path);
            }
        }
    }, [profile]);

    const handleImagePick = (image) => {
        setProfileImage(image.source);
        setProfileImagePath(image.path);
        setImagePickerVisible(false);
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSave = async () => {
        let valid = true;
        let errors = { fullName: '', email: '', password: '' };

        if (!fullName) {
            errors.fullName = 'Поле ім\'я не може бути порожнім';
            valid = false;
        }
        if (!email) {
            errors.email = 'Поле ел. пошти не може бути порожнім';
            valid = false;
        } else if (!validateEmail(email)) {
            errors.email = 'Введіть коректну адресу ел. пошти';
            valid = false;
        }
        if (!password) {
            errors.password = 'Поле пароля не може бути порожнім';
            valid = false;
        }

        setErrorMessage(errors);

        if (!valid) return;

        try {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                console.error('User ID not found');
                return;
            }

            const response = await axios.post('http://192.168.31.222:3000/update-profile', {
                fullName,
                email,
                password,
                avatar: profileImagePath,
                userId,
            });
            console.log('Profile updated successfully:', response.data);
            onProfileUpdated(); // Вызов функции обратного вызова для обновления профиля
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
        }
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
                        {errorMessage.fullName ? <Text style={styles.errorText}>{errorMessage.fullName}</Text> : null}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Адреса ел. пошти</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Адреса ел. пошти"
                            value={email}
                            onChangeText={setEmail}
                        />
                        {errorMessage.email ? <Text style={styles.errorText}>{errorMessage.email}</Text> : null}
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
                        {errorMessage.password ? <Text style={styles.errorText}>{errorMessage.password}</Text> : null}
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
                                <Image source={item.source} style={styles.imageOption} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                    />
                </View>
            </Modal>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        width: '100%',
        height: '90%',
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
        width: 150,
        height: 150,
        borderRadius: 75,
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
        marginLeft: 15,
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
    errorText: {
        color: 'red',
        marginLeft: 5,
        marginTop: 5,
        fontSize: 12,
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
