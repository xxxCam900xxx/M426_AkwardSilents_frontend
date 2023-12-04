import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import ProfilePage from "./pages/ProfilePage"
import FriendsPage from "./pages/FriendsPage"

const Tab = createBottomTabNavigator()

const Navbar = () => {
    return (
        <Tab.Navigator
            initialRouteName="FriendsPage"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "white",
                tabBarActiveBackgroundColor: "#474545",
                tabBarInactiveBackgroundColor: "#474545",
                headerShown: false,
                tabBarStyle: { borderTopWidth: 0 }
            }}
        >
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