import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

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

function FriendsPage() {
    return (
        <View style={{ flex: 1, backgroundColor: '#232D3F' }}>
            {/* Header mit Titel und Add Contact Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                <Text style={{ color: 'white', fontSize: 24 }}>Recent Chats</Text>
                <TouchableOpacity style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 20 }}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>
            {/* Chat-Liste */}
            <FlatList
                data={recentChats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: 'white' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>{item.name}</Text>
                            <Text style={{ color: 'white', fontSize: 14, marginLeft: 10 }}>{item.lastMessage}</Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 14 }}>{item.time}</Text>
                    </View>
                )}
            />
        </View>
    );
}

export default FriendsPage;
