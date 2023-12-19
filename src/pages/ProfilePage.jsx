import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

function ProfilePage() {
    const [userProfile, setUserProfile] = useState({});

    useEffect(() => {
        // Load data from SecureStore during component initialization
        const loadUserData = async () => {
            try {
                const storedData = await SecureStore.getItemAsync('userData');
                console.log('Stored data:', storedData); // Überprüfe die geladenen Daten
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    console.log('Parsed data:', parsedData); // Überprüfe die geparsen Daten
                    setUserProfile(parsedData);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#232D3F', padding: 17, paddingTop: 51 }}>
            <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>Profile</Text>

            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Username</Text>
                <Text style={{ color: 'white', fontSize: 14 }}>{userProfile.userName}</Text>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Hobbies</Text>
                <Text style={{ color: 'white', fontSize: 14 }}>{userProfile.hobbies}</Text>
            </View>

            <View style={{ marginBottom: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>Phone Number with Country Code</Text>
                <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>{userProfile.country?.code} {userProfile.phoneNumber}</Text>
            </View>

        </View>
    );
}

export default ProfilePage;
