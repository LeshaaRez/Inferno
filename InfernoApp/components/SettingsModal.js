import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InfoModal = ({ visible, onClose }) => {
    const [notifications, setNotifications] = useState(true);
    const [vibration, setVibration] = useState(true);
    const [music, setMusic] = useState(false);
    const [soundEffects, setSoundEffects] = useState(true);

    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            "Підтвердження виходу",
            "Ви впевнені, що хочете вийти з аккаунта?",
            [
                {
                    text: "Скасувати",
                    style: "cancel"
                },
                {
                    text: "Так",
                    onPress: () => navigation.navigate('StartScreen')
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalContainer} onPress={onClose} activeOpacity={1}>
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                    <Text style={styles.title}>Налаштування</Text>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Сповіщення</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FD6927" }}
                            thumbColor={notifications ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={setNotifications}
                            value={notifications}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Вібрація</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FD6927" }}
                            thumbColor={vibration ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={setVibration}
                            value={vibration}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Музика</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FD6927" }}
                            thumbColor={music ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={setMusic}
                            value={music}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Звукові ефекти</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#FD6927" }}
                            thumbColor={soundEffects ? "#f4f3f4" : "#f4f3f4"}
                            onValueChange={setSoundEffects}
                            value={soundEffects}
                        />
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutButtonText}>Вийти з аккаунта</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
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
        height: '65%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        color: '#FD6927',
        marginBottom: 10,
        textAlign: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    settingText: {
        fontSize: 18,
        color: 'black',
    },
    logoutButton: {
        backgroundColor: '#FFA500', // Match the button color from the image
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 25,
        width: '90%',
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default InfoModal;
