import React, { useState, useRef } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
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
    const searchInputRef = useRef(null);
  
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
      setSearchQuery(''); // Zurücksetzen der Suchanfrage beim Schließen des Modals
    };
  
    // Funktion zum Filtern von Chats und Kontakten basierend auf der Suchanfrage
    const filterData = (data) => {
      return data.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.lastMessage && item.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    };
  
    return (
      <View style={{ flex: 1, backgroundColor: '#232D3F' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingTop: 51 }}>
          <Text style={{ color: 'white', fontSize: 24 }}>Recent Chats</Text>
          <TouchableOpacity style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 20 }} onPress={toggleModal}>
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
  
        {/* Suchfeld */}
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Suchen..."
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
  
        {/* Chat-Liste */}
        <FlatList
          data={filterData(recentChats)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ChatPage', { chatId: item.id })}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 17, borderBottomWidth: 1, borderColor: 'white' }}>
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
              <Text style={{ color: '#DFDFDF', fontSize: 24 }}>Add Contact</Text>
  
              {/* Suchfeld für Kontakte */}
              <TextInput
                style={styles.searchInput}
                placeholder="Suchen..."
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
  
              {/* Liste der verfügbaren Kontakte */}
              <FlatList
                data={filterData(availableContacts)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    toggleModal();
                    navigation.navigate('ChatPage', { chatId: item.id })
                  }}>
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
  });
  
  export default FriendsPage;