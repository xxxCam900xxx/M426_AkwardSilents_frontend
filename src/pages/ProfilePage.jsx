import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const initialUserProfile = [
    { id: '1', attribute: 'Name', value: 'John Doe' },
    { id: '2', attribute: 'Alter', value: '28 Jahre' },
    { id: '3', attribute: 'Stadt', value: 'Berlin' },
    { id: '4', attribute: 'Beruf', value: 'Softwareentwickler' },
    { id: '5', attribute: 'Hobbys', value: 'Lesen, Radfahren, Musik' },
];

function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [editedAttribute, setEditedAttribute] = useState('');
    const [editedValue, setEditedValue] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [userProfile, setUserProfile] = useState(initialUserProfile);

    const handleEditPress = (attribute, value) => {
        setEditedAttribute(attribute);
        setEditedValue(value);
        setModalVisible(true);
    };

    const handleSavePress = () => {
        const updatedProfile = userProfile.map(item =>
            item.attribute === editedAttribute ? { ...item, value: editedValue } : item
        );
        setUserProfile(updatedProfile);
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#232D3F' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingTop: 51 }}>
                <Text style={{ color: 'white', fontSize: 24 }}>Profil</Text>
                <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 20 }}>
                    <MaterialIcons name={isEditing ? 'save' : 'edit'} size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={userProfile}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => isEditing ? handleEditPress(item.attribute, item.value) : null}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: 'white' }}>
                            <View>
                                <Text style={{ color: 'white', fontSize: 18 }}>{item.attribute}</Text>
                                <Text style={{ color: 'white', fontSize: 14 }}>{isEditing ? 'Tippen, um zu bearbeiten' : item.value}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>{`Bearbeite ${editedAttribute}`}</Text>
                        <TextInput
                            style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                            value={editedValue}
                            onChangeText={(text) => setEditedValue(text)}
                        />
                        <TouchableOpacity onPress={handleSavePress} style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 5 }}>
                            <Text style={{ color: 'white' }}>Speichern</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ProfilePage;
