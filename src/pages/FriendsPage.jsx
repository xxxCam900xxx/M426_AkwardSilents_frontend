import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Image } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

const recentChatsData = [];

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
        else if (event.data === "logout") {

        }
        else {
          try {
            console.log("****************************" + event.data);
            const message = JSON.parse(event.data);
            console.log("++++++++++++++" + message)
            console.log("")
            if (message[0].user1 != undefined) {
              let newArray = []
              message.forEach(element => {
                console.log(element.user1 + ": " + element)
                if (element.user1 != "q") newArray.push({ "name": element.user1, "id": element.id })
                else newArray.push({ "name": element.user2, "id": element.id })
              })
              console.log(newArray)
              setRecentChats(newArray)

            }
          }
          catch (error) {
            console.log(error)
          }
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
        { id: newContact.id, name: newContact.name, },
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
                </View>
              </View>
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