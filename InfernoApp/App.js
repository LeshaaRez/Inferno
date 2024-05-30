import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './components/StartScreen';
import MainScreen from './components/MainScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
