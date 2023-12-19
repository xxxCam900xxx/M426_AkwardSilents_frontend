import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';

function ProfilePage() {
    const [userProfile, setUserProfile] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedAttribute, setEditedAttribute] = useState('');
    const [editedValue, setEditedValue] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await SecureStore.getItemAsync('userData');
                console.log('Stored data:', storedData);
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    console.log('Parsed data:', parsedData);
                    setUserProfile(parsedData);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    const handleEditPress = (attribute, value) => {
        setEditedAttribute(attribute);
        setEditedValue(value);
        setIsEditing(true);
    };

    const handleSavePress = async () => {
        const updatedProfile = { ...userProfile, [editedAttribute]: editedValue };
        setUserProfile(updatedProfile);
        setIsEditing(false);

        // Save updated data to SecureStore
        try {
            await SecureStore.setItemAsync('userData', JSON.stringify(updatedProfile));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

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

            <TouchableOpacity onPress={() => handleEditPress('userName', userProfile.userName)}>
                <Text style={{ color: 'white', fontSize: 16, textDecorationLine: 'underline' }}>Edit Username</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleEditPress('hobbies', userProfile.hobbies)}>
                <Text style={{ color: 'white', fontSize: 16, textDecorationLine: 'underline' }}>Edit Hobbies</Text>
            </TouchableOpacity>

            <Modal visible={isEditing} transparent={true} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>{`Edit ${editedAttribute}`}</Text>
                        <TextInput
                            style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                            value={editedValue}
                            onChangeText={(text) => setEditedValue(text)}
                        />
                        <TouchableOpacity onPress={handleSavePress} style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ProfilePage;
