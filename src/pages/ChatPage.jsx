import React, { useState, useRef, useEffect } from 'react';
import { format, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatPage = ({ userProfile }) => {
  const [exampleMessages, setExampleMessages] = useState([
    { id: 1, sender: 'Friend', message: 'Hallo, wie geht es dir?', timestamp: new Date(2022, 1, 1, 9, 0) },
    { id: 2, sender: 'Me', message: 'Hallo! Mir geht es gut, danke.', timestamp: new Date(2022, 1, 1, 9, 15) },
    { id: 3, sender: 'Friend', message: 'Was machst du heute Abend?', timestamp: new Date(2022, 1, 2, 12, 30) },
    { id: 4, sender: 'Me', message: 'Ich habe keine konkreten Pläne. Was schlägst du vor?', timestamp: new Date(2022, 1, 2, 14, 45) },
    { id: 5, sender: 'Friend', message: 'Vielleicht könnten wir zusammen essen gehen?', timestamp: new Date(2022, 1, 3, 19, 0) },
    { id: 6, sender: 'Me', message: 'Klingt gut! Hast du einen bestimmten Ort im Sinn?', timestamp: new Date(2022, 1, 3, 19, 30) },
    { id: 7, sender: 'Friend', message: 'Wie wäre es mit dem neuen Restaurant in der Innenstadt?', timestamp: new Date(2022, 1, 4, 8, 45) },
    { id: 8, sender: 'Me', message: 'Perfekt! Um welche Uhrzeit?', timestamp: new Date(2022, 1, 4, 9, 15) },
    { id: 9, sender: 'Friend', message: '19 Uhr passt mir gut. Wie sieht es bei dir aus?', timestamp: new Date(2022, 1, 4, 9, 30) },
    { id: 10, sender: 'Me', message: 'Das passt auch für mich. Wir sehen uns dort!', timestamp: new Date(2022, 1, 4, 10, 0) },
  ]);
  const navigation = useNavigation();
  const route = useRoute();
  const { chatName } = route.params;

  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef(null);

  const setFlatListRef = (ref) => {
    flatListRef.current = ref;
  };

  const renderMessage = ({ item, index }) => {
    const showDate = index === 0 || !isSameDay(new Date(item.timestamp), new Date(exampleMessages[index - 1].timestamp));
    return (
      <View>
        {showDate && (
          <Text style={styles.dateText}>
            {format(new Date(item.timestamp), 'dd.MMMM.yyyy', { locale: de })}
          </Text>
        )}
        <View style={item.sender === 'Me' ? styles.myMessage : styles.friendMessage}>
          <View style={styles.messageContainer}>
            <View>
              <Text style={styles.messageText}>{item.message}</Text>
              <Text style={item.sender === 'Me' ? styles.myTimestamp : styles.friendTimestamp}>
                {format(new Date(item.timestamp), 'HH:mm')}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        id: exampleMessages.length + 1,
        sender: 'Me',
        message: inputMessage,
        timestamp: new Date(),
      };

      // Update the exampleMessages state
      setExampleMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the input field
      setInputMessage('');
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [exampleMessages]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Image source={require('../Pictures/ProfilePicture.jpg')} style={styles.profileImage} />
          <Text style={styles.headerText}>{chatName}</Text>
        </View>

        {/* Nachrichtenliste */}
        <FlatList
          ref={setFlatListRef}
          data={exampleMessages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          style={styles.messageList}
        />

        {/* Eingabebereich für neue Nachricht */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Schreibe eine Nachricht..."
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="paper-plane" size={34} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 17,
    marginRight: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senderName: {
    color: '#DFDFDF',
    fontSize: 12,
    marginRight: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#232D3F',
    color: '#DFDFDF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 51,
    backgroundColor: '#0F0F0F',
    color: '#DFDFDF',
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#DFDFDF',
  },
  messageList: {
    flex: 1,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#005B41',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    maxWidth: '70%',
  },
  friendMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#0F0F0F',
    color: '#DFDFDF',
    borderRadius: 10,
    margin: 5,
    padding: 10,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: '#DFDFDF',
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0F0F0F',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 30,
  },
  sendIcon: {
    color: '#005B41',
  },
  myTimestamp: {
    alignSelf: 'flex-end',
    color: '#888888',
    marginRight: 5,
  },
  friendTimestamp: {
    alignSelf: 'flex-start',
    color: '#888888',
    marginLeft: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#888888',
    alignSelf: 'center',
    marginVertical: 5,
  },
});

export default ChatPage;