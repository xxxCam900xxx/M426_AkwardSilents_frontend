import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "expo-image-picker";

function ProfilePage() {
    const [userProfile, setUserProfile] = useState({});
    const [isEditing, setIsEditing] = useState();
    const [editedValue, setEditedValue] = useState({
        userName: userProfile.userName,
        hobbies: userProfile.hobbies,
        phoneNumber: userProfile.phoneNumber,
        profileImage: userProfile.profileImage,
        backgroundImage: userProfile.backgroundImage
    });
    const navigation = useNavigation();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedData = await SecureStore.getItemAsync('userData');
                if (storedData) {
                    const parsedData = JSON.parse(storedData);
                    setUserProfile(parsedData);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, []);

    const handleEditAll = () => {
        setEditedValue({
            userName: userProfile.userName,
            hobbies: userProfile.hobbies,
            phoneNumber: userProfile.phoneNumber,
            profileImage: userProfile.profileImage,
            backgroundImage: userProfile.backgroundImage
        });
        setIsEditing(true);
    };


    const pickBackgoundImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setEditedValue({ ...editedValue, backgroundImage: selectedImageUri });
        }
    };

    const pickProfileImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            setEditedValue({ ...editedValue, profileImage: selectedImageUri });
        }
    };


    const handleSavePress = async () => {

        let profileImageBase64 = null;
        let backgroundImageBase64 = null;

        if (editedValue.backgroundImage && editedValue.profileImage) {
            const profileImageResponse = await fetch(editedValue.profileImage);
            const profileImageBlob = await profileImageResponse.blob();
            profileImageBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(profileImageBlob);
            });

            const backgroundImageResponse = await fetch(editedValue.backgroundImage);
            const backgroundImageBlob = await backgroundImageResponse.blob();
            backgroundImageBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(backgroundImageBlob);
            });
        }
        setEditedValue({ ...editedValue, backgroundImage: backgroundImageBase64 });
        setEditedValue({ ...editedValue, profileImage: profileImageBase64 });

        const updatedProfile = { ...userProfile, ...editedValue }; // Hier werden die bearbeiteten Werte hinzugefügt

        setUserProfile(updatedProfile);

        // Save updated data to SecureStore
        try {
            console.log(updatedProfile)
            await SecureStore.setItemAsync('userData', JSON.stringify(updatedProfile));
        } catch (error) {
            console.error('Error saving user data:', error);
        }

        setIsEditing(false);

    };

    const handleCancelPress = () => {
        setIsEditing(false);
    }

    const deleteUserDataAndNavigate = async () => {
        await SecureStore.deleteItemAsync('userData');
        navigation.navigate('RegisterPage');
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Konto löschen',
            'Möchten Sie Ihr Konto wirklich löschen?',
            [
                {
                    text: 'Abbrechen',
                    style: 'cancel',
                },
                {
                    text: 'Löschen',
                    onPress: () => {
                        deleteUserDataAndNavigate();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#232D3F', padding: 17, paddingTop: 51 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ color: 'white', fontSize: 24 }}>
                    Profile
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="pencil" size={24} color="white" onPress={() => handleEditAll()} />
                    <Icon name="trash" size={24} color="white" style={{ marginLeft: 17 }} onPress={() => handleDeleteAccount()} />
                </View>
            </View>

            {userProfile.profileImage && (
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Profile Image</Text>
                    <Image source={{ uri: userProfile.profileImage }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                </View>
            )}

            {userProfile.profileImage && (
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Background Image</Text>
                    <Image source={{ uri: userProfile.backgroundImage }} style={{ width: 100, height: 100, borderRadius: 5 }} />
                </View>
            )}

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

            <Modal visible={isEditing} transparent={true} animationType="slide">
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Bearbeiten</Text>
                            <TextInput
                                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                                placeholder="Username"
                                value={editedValue.userName}
                                onChangeText={(text) => setEditedValue({ ...editedValue, userName: text })}
                            />
                            <TextInput
                                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                                placeholder="Hobbies"
                                value={editedValue.hobbies}
                                onChangeText={(text) => setEditedValue({ ...editedValue, hobbies: text })}
                            />
                            <TextInput
                                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                                placeholder="Phone Number"
                                value={editedValue.phoneNumber}
                                onChangeText={(text) => setEditedValue({ ...editedValue, phoneNumber: text })}
                                keyboardType="numeric"
                            />

                            {/* TODO */}
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 5}}>
                                <View>
                                    <Text>Background:</Text>
                                    <View style={{ marginBottom: 10 }}>
                                        <TouchableOpacity onPress={() => pickBackgoundImage()}>
                                            <Image source={{ uri: (editedValue.backgroundImage) ? (editedValue.backgroundImage) : ((userProfile.backgroundImage) ? (userProfile.backgroundImage) : ('https://static.pixelbar.be/wp-content/uploads/2014/09/blog-pixelbar-foto-platzhalter.jpg'))}} style={{ width: 100, height: 100, borderRadius: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View>
                                    <Text>Profile:</Text>
                                    <View style={{ marginBottom: 10 }}>
                                        <TouchableOpacity onPress={() => pickProfileImage()}>
                                            <Image source={{ uri: (editedValue.profileImage) ? (editedValue.profileImage) : ((userProfile.profileImage) ? (userProfile.profileImage) : ('https://static.pixelbar.be/wp-content/uploads/2014/09/blog-pixelbar-foto-platzhalter.jpg'))}} style={{ width: 100, height: 100, borderRadius: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={handleSavePress} style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 5, flex: 1, marginRight: 10 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCancelPress} style={{ backgroundColor: '#B22222', padding: 10, borderRadius: 5, flex: 1, marginLeft: 10 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}

export default ProfilePage;
