import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, ImageBackground } from 'react-native';

// Создайте пустые компоненты для других кнопок
const PlaceholderScreen = () => (
    <View style={styles.container} />
);

// Создайте Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let icon;
                    if (route.name === 'Main') {
                        icon = focused
                            ? require('../assets/menu/home-active.png')
                            : require('../assets/menu/home.png');
                    } else if (route.name === 'Shop') {
                        icon = focused
                            ? require('../assets/menu/shop-active.png')
                            : require('../assets/menu/shop.png');
                    } else if (route.name === 'Create') {
                        icon = focused
                            ? require('../assets/menu/create-active.png')
                            : require('../assets/menu/create.png');
                    } else if (route.name === 'Profile') {
                        icon = focused
                            ? require('../assets/menu/profile-active.png')
                            : require('../assets/menu/profile.png');
                    }

                    // Вернуть компонент иконки
                    return <Image source={icon} style={styles.icon} resizeMode="contain" />;
                },
                tabBarBackground: () => (
                    <ImageBackground
                        source={require('../assets/menu/tabBarBackground.png')}
                        style={styles.background}
                    />
                ),
            })}
            tabBarOptions={{
                activeTintColor: 'orange',
                inactiveTintColor: 'gray',
                showLabel: false, // Убрать подписи
                style: styles.tabBar,
            }}
        >
            <Tab.Screen name="Main" component={PlaceholderScreen} />
            <Tab.Screen name="Shop" component={PlaceholderScreen} />
            <Tab.Screen name="Create" component={PlaceholderScreen} />
            <Tab.Screen name="Profile" component={PlaceholderScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 70,
        height: 70,
        marginTop: -15,
    },
    tabBar: {
        backgroundColor: 'transparent', // Сделать фон прозрачным
        borderTopColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    background: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 90, // Установить высоту фона, соответствующую высоте панели
    },
    container: {
        flex: 1,
    },
});

export default BottomTabNavigator;
