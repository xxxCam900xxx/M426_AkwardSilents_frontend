import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const recentChats = [
    { id: '1', name: 'Alice', lastMessage: 'Wie geht es dir?', time: '10:30 AM' },
    { id: '2', name: 'Bob', lastMessage: 'Wollen wir heute Abend ausgehen?', time: '11:45 AM' },
    { id: '3', name: 'Charlie', lastMessage: 'Ich freue mich auf das Wochenende!', time: '01:20 PM' },
    { id: '4', name: 'David', lastMessage: 'Hast du meine E-Mail erhalten?', time: '02:15 PM' },
    { id: '5', name: 'Eva', lastMessage: 'Lass uns morgen frühstücken gehen.', time: '03:05 PM' },
    { id: '6', name: 'Frank', lastMessage: 'Wie war dein Tag?', time: '04:40 PM' },
    { id: '7', name: 'Grace', lastMessage: 'Ich vermisse dich!', time: '05:55 PM' },
    { id: '8', name: 'Henry', lastMessage: 'Hast du die Hausaufgaben gemacht?', time: '06:30 PM' },
    { id: '9', name: 'Ivy', lastMessage: 'Bereit für das Wochenende?', time: '07:20 PM' },
    { id: '10', name: 'Jack', lastMessage: 'Welchen Film sollen wir sehen?', time: '08:10 PM' },
    { id: '11', name: 'Katie', lastMessage: 'Ich komme etwas später.', time: '09:05 PM' },
    { id: '12', name: 'Leo', lastMessage: 'Hast du das Buch gelesen?', time: '10:15 PM' },
    { id: '13', name: 'Mia', lastMessage: 'Freust du dich auf das Wochenende?', time: '11:30 PM' },
    { id: '14', name: 'Noah', lastMessage: 'Hast du das Essen vorbereitet?', time: '12:45 AM' },
    { id: '15', name: 'Olivia', lastMessage: 'Lass uns morgen spazieren gehen.', time: '01:55 AM' },
    { id: '16', name: 'Peter', lastMessage: 'Wie war das Treffen?', time: '02:40 AM' },
    { id: '17', name: 'Quinn', lastMessage: 'Bist du bereit für die Präsentation?', time: '03:25 AM' },
    { id: '18', name: 'Rachel', lastMessage: 'Hast du meine Nachricht erhalten?', time: '04:15 AM' },
    { id: '19', name: 'Sam', lastMessage: 'Wie war dein Wochenende?', time: '05:30 AM' },
    { id: '20', name: 'Tom', lastMessage: 'Wann treffen wir uns?', time: '06:20 AM' },
];

const availableContacts = [
    { id: '101', name: 'Person A' },
    { id: '102', name: 'Person B' },
];

function FriendsPage() {

    const navigation = useNavigation();

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#232D3F' }}>
            {/* Header mit Titel und Add Contact Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingTop: 51 }}>
                <Text style={{ color: 'white', fontSize: 24 }}>Recent Chats</Text>
                <TouchableOpacity style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 20 }} onPress={toggleModal}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Chat-Liste */}
            <FlatList
                data={recentChats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ChatPage', { chatId: item.id })}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: 'white' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>{item.name}</Text>
                                <Text style={{ color: 'white', fontSize: 14, marginLeft: 10 }}>{item.lastMessage}</Text>
                            </View>
                            <Text style={{ color: 'white', fontSize: 14 }}>{item.time}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Modal Overlay für Personenliste */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'black', fontSize: 24 }}>Add Contact</Text>
                        <FlatList
                            data={availableContacts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    toggleModal();
                                    navigation.navigate('ChatPage', { chatId: item.id })
                                }}>
                                    <Text style={{ fontSize: 18 }}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={{ color: 'blue', fontSize: 18, marginTop: 10 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </View >
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 10,
    },
});

export default FriendsPage;
