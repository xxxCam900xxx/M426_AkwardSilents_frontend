import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Image } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

const recentChatsData = [
  { id: '1', name: 'Alice', lastMessage: 'Wie geht es dir?', time: new Date(2024, 1, 20, 20, 20) },
  { id: '2', name: 'Bob', lastMessage: 'Wollen wir heute Abend ausgehen?', time: new Date(2024, 1, 19, 19, 19) },
  { id: '3', name: 'Charlie', lastMessage: 'Ich freue mich auf das Wochenende!', time: new Date(2024, 1, 18, 18, 18) },
  { id: '4', name: 'David', lastMessage: 'Hast du meine E-Mail erhalten?', time: new Date(2024, 1, 17, 17, 17) },
  { id: '5', name: 'Eva', lastMessage: 'Lass uns morgen frühstücken gehen.', time: new Date(2024, 1, 16, 16, 16) },
  { id: '6', name: 'Frank', lastMessage: 'Wie war dein Tag?', time: new Date(2024, 1, 15, 15, 15) },
  { id: '7', name: 'Grace', lastMessage: 'Ich vermisse dich!', time: new Date(2024, 1, 14, 14, 14) },
  { id: '8', name: 'Henry', lastMessage: 'Hast du die Hausaufgaben gemacht?', time: new Date(2024, 1, 13, 13, 13) },
  { id: '9', name: 'Ivy', lastMessage: 'Bereit für das Wochenende?', time: new Date(2024, 1, 12, 12, 12) },
  { id: '10', name: 'Jack', lastMessage: 'Welchen Film sollen wir sehen?', time: new Date(2024, 1, 11, 11, 11) },
  { id: '11', name: 'Katie', lastMessage: 'Ich komme etwas später.', time: new Date(2024, 1, 10, 10, 10) },
  { id: '12', name: 'Leo', lastMessage: 'Hast du das Buch gelesen?', time: new Date(2024, 1, 9, 9, 9) },
  { id: '13', name: 'Mia', lastMessage: 'Freust du dich auf das Wochenende?', time: new Date(2024, 1, 8, 8, 8) },
  { id: '14', name: 'Noah', lastMessage: 'Hast du das Essen vorbereitet?', time: new Date(2024, 1, 7, 7, 7) },
  { id: '15', name: 'Olivia', lastMessage: 'Lass uns morgen spazieren gehen.', time: new Date(2024, 1, 6, 6, 6) },
  { id: '16', name: 'Peter', lastMessage: 'Wie war das Treffen?', time: new Date(2024, 1, 5, 5, 5) },
  { id: '17', name: 'Quinn', lastMessage: 'Bist du bereit für die Präsentation?', time: new Date(2024, 1, 4, 4, 4) },
  { id: '18', name: 'Rachel', lastMessage: 'Hast du meine Nachricht erhalten?', time: new Date(2024, 1, 3, 3, 3) },
  { id: '19', name: 'Sam', lastMessage: 'Wie war dein Wochenende?', time: new Date(2024, 1, 2, 2, 2) },
  { id: '20', name: 'Tom', lastMessage: 'Wann treffen wir uns?', time: new Date(2024, 1, 1, 1, 1) },
];

const availableContactsData = [
  { id: '101', name: 'Emma Johnson' },
  { id: '102', name: 'Liam Davis' },
  { id: '103', name: 'Olivia Smith' },
  { id: '104', name: 'Noah Wilson' },
  { id: '105', name: 'Ava Brown' },
  { id: '106', name: 'Isabella Jones' },
  { id: '107', name: 'Sophia Taylor' },
  { id: '108', name: 'Jackson Miller' },
  { id: '109', name: 'Lucas Anderson' },
  { id: '110', name: 'Aiden Thomas' },
  { id: '111', name: 'Ella White' },
  { id: '112', name: 'Carter Moore' },
  { id: '113', name: 'Scarlett Robinson' },
  { id: '114', name: 'Grayson Hall' },
  { id: '115', name: 'Hazel Young' },
  { id: '116', name: 'Aria Mitchell' },
  { id: '117', name: 'Ezra Turner' },
  { id: '118', name: 'Mila Cooper' },
  { id: '119', name: 'Leo Reed' },
  { id: '120', name: 'Nora Ward' },
];

function FriendsPage() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryModal, setSearchQueryModal] = useState('');
  const [recentChats, setRecentChats] = useState(recentChatsData);
  const [availableContacts, setAvailableContacts] = useState(availableContactsData);
  const searchInputRef = useRef(null);
  const route = useRoute();
  const { ip } = route.params ?? {};

  useEffect(() => {
    try {
      const socketConnection = new WebSocket(`ws://${ip}:3001/chat`);
      socketConnection.onopen = (event) => {
        console.log("WebSocket connection opened");
        socketConnection.send("{'Typ':'login','Content': {'Key': 'hello'}}");
        console.log("Received from the server: ", event);
      };
      socketConnection.onmessage = (event) => {
        console.log("Received from the server: ", event.data);
        if (event.data === "login success") {
          socketConnection.send("{'Typ':'getoverview','Content': {}}");
        }
      };
    } catch (error) {
      console.error('Error during network request:', error);
    }
  }, [ip]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setSearchQuery('');
    setSearchQueryModal('');
  };

  const filterChats = (data) => {
    return data.filter(
      (item) =>
        (item.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filterContacts = (data) => {
    return data.filter((item) => item.name?.toLowerCase().includes(searchQueryModal.toLowerCase()));
  };

  const addContact = (contactId) => {
    const newContact = availableContacts.find((contact) => contact.id === contactId);
    if (newContact) {
      console.log(`Kontakt mit der ID ${contactId} hinzugefügt.`);
      setRecentChats((prevChats) => [
        { id: newContact.id, name: newContact.name, lastMessage: '', time: new Date(), },
        ...prevChats,
      ]);
      setAvailableContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
    }
    toggleModal();
    navigation.navigate('ChatPage', { chatId: newContact.id, chatName: newContact.name });
  };

  const removeContact = (contactId) => {
    const removedContactIndex = recentChats.findIndex((chat) => chat.id === contactId);
    if (removedContactIndex !== -1) {
      console.log(`Kontakt mit der ID ${contactId} entfernt.`);
      setRecentChats((prevChats) => [...prevChats.slice(0, removedContactIndex), ...prevChats.slice(removedContactIndex + 1)]);
      setAvailableContacts((prevContacts) => [
        ...prevContacts,
        { id: contactId, name: recentChats[removedContactIndex].name },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#232D3F' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingTop: 51 }}>
        {ip ? (
          <Text style={{ color: 'white', fontSize: 24 }}>Recent Chats from {ip}</Text>
        ) : (
          <Text style={{ color: 'white', fontSize: 24 }}>Recent Chats</Text>
        )}
        <TouchableOpacity style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 20 }} onPress={toggleModal}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TextInput
        ref={searchInputRef}
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor="gray"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <FlatList
        data={filterChats(recentChats)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ChatPage', { chatId: item.id, chatName: item.name, ip })}
            onLongPress={() => removeContact(item.id)}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 17, borderBottomWidth: 1, borderColor: 'white' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../Pictures/ProfilePicture.jpg')} style={styles.profileImage} />
                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                  <Text style={{ color: 'white', fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ color: 'white', fontSize: 14 }}>{item.lastMessage}</Text>
                </View>
              </View>
              <Text style={{ color: 'white', fontSize: 14 }}>{format(new Date(item.time), 'HH:mm')}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ color: '#DFDFDF', fontSize: 24 }}>Add Contact</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="gray"
              value={searchQueryModal}
              onChangeText={(text) => setSearchQueryModal(text)}
            />

            <FlatList
              data={filterContacts(availableContacts)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addContact(item.id)}>
                  <Text style={{ color: '#DFDFDF', fontSize: 18, paddingTop: 17 }}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity onPress={toggleModal} style={{ marginTop: 10 }}>
              <FontAwesome name="close" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    backgroundColor: '#232D3F',
    padding: 50,
    borderRadius: 10,
    width: '80%',
    height: '80%',
    marginVertical: 68,
  },
  searchInput: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 10,
    paddingLeft: 10,
    color: 'black',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default FriendsPage;