import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import ProfilePage from "./pages/ProfilePage"
import FriendsPage from "./pages/FriendsPage"
import ServerPage from './pages/ServerPage';

const Tab = createBottomTabNavigator()

const Navbar = () => {
    return (
        <Tab.Navigator
            initialRouteName="FriendsPage"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "white",
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: "#000000",
                    borderRadius: 30,
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    height: 60,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    padding: 10,
                }
            }}
        >
            <Tab.Screen
                name="ServerPage"
                component={ServerPage}
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="storage" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="FriendsPage"
                component={FriendsPage}
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="message" size={24} color={color} />
                }}
            />
            <Tab.Screen
                name="ProfilePage"
                component={ProfilePage}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />
                }}
            />
        </Tab.Navigator>
    );
};

export default Navbar;