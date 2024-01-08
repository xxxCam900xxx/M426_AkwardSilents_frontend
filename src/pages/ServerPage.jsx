import React, {useEffect, useState} from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/core";

const servers = [];

export default function ServerPage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [url, setUrl] = useState('');
    const [serverReachable, setServerReachable] = useState(false);
    const navigation = useNavigation();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleInputChange = (text) => {
        setUrl(text);
    };

    const ServerPing = async () => {
            // Make a HEAD request to the server
            const response = await fetch(`http://${url}`);

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                setServerReachable(true);
                console.log('Server is reachable:', response);
                servers.push({ ip: url});
                console.log(url)
                //navigation.navigate('FriendsPage', { ip: url });
            } else {
                console.log('Server returned an error:', response.status, response.statusText);
                setServerReachable(false);
            }
    };


    useEffect(() => {
        console.log(url);
    }, [url]);


    return (
        <View style={{ flex: 1, backgroundColor: '#232D3F' }}>
            {/* Header mit Titel und Add Contact Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingTop: 51 }}>
                <Text style={{ color: 'white', fontSize: 24, padding: 2 }}>Servers</Text>
                <TouchableOpacity style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 20 }} onPress={toggleModal}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Server-Liste */}
            <FlatList
                data={servers}
                keyExtractor={(item) => item.ip}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderColor: 'white' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>{item.ip}</Text>
                        </View>
                    </View>
                )}
            />

            {/* Modal Overlay für Personenliste */}
            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: 'black', fontSize: 24 }}>Add Server</Text>
                        <Text>Enter Server IP-Address:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8 }}
                            placeholder="Type something..."
                            value={url}
                            onChangeText={handleInputChange}
                        />
                        <TouchableOpacity onPress={() => { ServerPing(); toggleModal(); }}>
                            <Text style={{ color: 'blue', fontSize: 18, marginTop: 10 }}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal}>
                            <Text style={{ color: 'blue', fontSize: 18, marginTop: 10 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Text>{serverReachable ? 'Reachable' : 'not Reachable'}</Text>
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
        backgroundColor: 'white',
        padding: 50,
        borderRadius: 10,
    },
});