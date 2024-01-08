import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const exampleMessages = [
    { id: 1, sender: 'Friend', message: 'Hallo, wie geht es dir?' },
    { id: 2, sender: 'Me', message: 'Hallo! Mir geht es gut, danke.' },
    { id: 3, sender: 'Friend', message: 'Was machst du heute Abend?' },
    { id: 4, sender: 'Me', message: 'Ich habe keine konkreten Pläne. Was schlägst du vor?' },
    { id: 5, sender: 'Friend', message: 'Vielleicht könnten wir zusammen essen gehen?' },
    { id: 6, sender: 'Me', message: 'Klingt gut! Hast du einen bestimmten Ort im Sinn?' },
    { id: 7, sender: 'Friend', message: 'Wie wäre es mit dem neuen Restaurant in der Innenstadt?' },
    { id: 8, sender: 'Me', message: 'Perfekt! Um welche Uhrzeit?' },
    { id: 9, sender: 'Friend', message: '19 Uhr passt mir gut. Wie sieht es bei dir aus?' },
    { id: 10, sender: 'Me', message: 'Das passt auch für mich. Wir sehen uns dort!' },
    { id: 11, sender: 'Friend', message: 'Super! Freue mich darauf.' },
    { id: 12, sender: 'Me', message: 'Ich auch! Bis später!' },
    { id: 13, sender: 'Friend', message: 'Hallo, wie geht es dir?' },
    { id: 14, sender: 'Me', message: 'Hallo! Mir geht es gut, danke.' },
    { id: 15, sender: 'Friend', message: 'Was machst du heute Abend?' },
    { id: 16, sender: 'Me', message: 'Ich habe keine konkreten Pläne. Was schlägst du vor?' },
    { id: 17, sender: 'Friend', message: 'Vielleicht könnten wir zusammen essen gehen?' },
    { id: 18, sender: 'Me', message: 'Klingt gut! Hast du einen bestimmten Ort im Sinn?' },
    { id: 19, sender: 'Friend', message: 'Wie wäre es mit dem neuen Restaurant in der Innenstadt?' },
    { id: 20, sender: 'Me', message: 'Perfekt! Um welche Uhrzeit?' },
    { id: 21, sender: 'Friend', message: '19 Uhr passt mir gut. Wie sieht es bei dir aus?' },
    { id: 22, sender: 'Me', message: 'Das passt auch für mich. Wir sehen uns dort!' },
    { id: 23, sender: 'Friend', message: 'Super! Freue mich darauf.' },
    { id: 24, sender: 'Me', message: 'Ich auch! Bis später!' },
];

const ChatPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { chatId } = route.params;
    console.log(route)

    const [inputMessage, setInputMessage] = useState('');
    const flatListRef = useRef(null);

    const setFlatListRef = (ref) => {
        flatListRef.current = ref;
    };

    const renderMessage = ({ item }) => (
        <View style={item.sender === 'Me' ? styles.myMessage : styles.friendMessage}>
            <Text style={styles.messageText}>{item.message}</Text>
        </View>
    );

    const sendMessage = () => {
        console.log('Nachricht senden:', inputMessage);
        setInputMessage('');
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
                    <Text style={styles.headerText}>{`Chat mit ${chatId}`}</Text>
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
});

export default ChatPage;
