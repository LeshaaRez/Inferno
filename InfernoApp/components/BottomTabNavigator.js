import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PlaceholderScreen from './PlaceholderScreen';
import ProfileScreen from './ProfileScreen';
import MainScreen from './MainScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const navigation = useNavigation();

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

          return <Image source={icon} style={styles.icon} resizeMode="contain" />;
        },
        tabBarBackground: () => (
          <ImageBackground
            source={require('../assets/menu/tabBarBackground.png')}
            style={styles.background}
          />
        ),
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Main" component={MainScreen} />
      <Tab.Screen name="Shop" component={PlaceholderScreen} />
      <Tab.Screen name="Create" component={PlaceholderScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 70,
    marginTop: 40
  },
  background: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 90,
  },
  container: {
    flex: 1,
  },
});

export default BottomTabNavigator;
