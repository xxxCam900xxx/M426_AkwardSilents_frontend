import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import Navbar from './Navbar';
import ServerPage from './pages/ServerPage';
import RegisterPage from './pages/Register';
import FriendsPage from './pages/FriendsPage';

const Stack = createNativeStackNavigator();

export const Router = () => {
    return (
        <Stack.Navigator initialRouteName='HomePage' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HomePage' component={HomePage} />
            <Stack.Screen name='RegisterPage' component={RegisterPage} />
            <Stack.Screen name='ServerPage' component={ServerPage} />
            <Stack.Screen name='Navbar' component={Navbar} />
            <Stack.Screen name='ChatPage' component={ChatPage} />
            <Stack.Screen name='ProfilePage' component={ProfilePage} />
        </Stack.Navigator>
    );
};
