import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import Navbar from './Navbar';

const Stack = createNativeStackNavigator();

export const Router = () => {
    return (
        <Stack.Navigator initialRouteName='Navbar' screenOptions={{ headerShown: true }}>
            <Stack.Screen name='HomePage' component={HomePage} />
            <Stack.Screen name='Navbar' component={Navbar} />
            <Stack.Screen name='ChatPage' component={ChatPage} />
            <Stack.Screen name='ProfilePage' component={ProfilePage} />
        </Stack.Navigator>
    );
};
