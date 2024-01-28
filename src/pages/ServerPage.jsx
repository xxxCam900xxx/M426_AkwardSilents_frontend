import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";

export default function ServerPage() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [url, setUrl] = useState('');
    const [serverReachable, setServerReachable] = useState(false);
    const navigation = useNavigation();
    const [servers, setServers] = useState([
        { id: '1', ip: 'digitec.ch' },
        { id: '2', ip: 'brack.ch' },
        { id: '3', ip: '192.168.1.1' },
        { id: '4', ip: '192.168.1.2' },
        { id: '5', ip: '192.168.1.109' },
    ]);
    const [search, setSearch] = useState('');
    const [filteredServers, setFilteredServers] = useState(servers);
    const [isLoading, setIsLoading] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleInputChange = (text) => {
        setUrl(text);
    };

    const removeServer = (serverId) => {
        const index = servers.findIndex((server) => server.id === serverId);
        if (index !== -1) {
            const updatedServers = [...servers.slice(0, index), ...servers.slice(index + 1)];
            setServers(updatedServers);
        }
    };

    const ServerPing = async () => {
        setIsLoading(true);
        if (!url) {
            console.error('URL is empty');
            setIsLoading(false);
            return;
        }

        try {
            const socketConnection = new WebSocket(`ws://${url}:3001/chat`);
            socketConnection.onopen = () => {
                console.log("WebSocket connection opened");
                socketConnection.send("{'Typ':'login','Content': {'Key': 'hello2'}}");
            };

            socketConnection.onmessage = (event) => {
                console.log("Received from the server: ", event.data);
                setServerReachable(true);
                const serverId = generateUniqueId();
                setServers([...servers, { id: serverId, ip: url }]);
                navigation.navigate('FriendsPage', { ip: url });
                setIsLoading(false);
            };

            socketConnection.onerror = (error) => {
                console.log("WebSocket error: ", error);
                setServerReachable(false);
                Alert.alert('Error', 'WebSocket server is not reachable');
                setIsLoading(false);
            };
            socketConnection.onclose = (event) => {
                console.log("WebSocket connection closed: ", event);
                setIsLoading(false);
            };
        } catch (error) {
            console.error('Error during network request:', error);
            setIsLoading(false);
        }
    };

    const generateUniqueId = () => {
        return Math.random().toString(36).substring(7);
    };

    useEffect(() => {
        setFilteredServers(
            servers.filter(server =>
                server.ip.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, servers]);

    return (
        <View style={{ flex: 1, backgroundColor: '#232D3F' }}>
            {/* Header mit Titel und Add Contact Button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, paddingTop: 51 }}>
                <Text style={{ color: 'white', fontSize: 24, padding: 2 }}>Servers</Text>
                <TouchableOpacity style={{ backgroundColor: '#005B41', padding: 10, borderRadius: 20 }} onPress={toggleModal}>
                    <MaterialIcons name="add" size={24} color="white" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <TextInput
                style={styles.searchServer}
                placeholder="Search..."
                value={search}
                onChangeText={setSearch}
            />

            <View>
                {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            </View>

            {/* Server-Liste */}
            <FlatList
                data={filteredServers}
                keyExtractor={(item) => item.ip}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('FriendsPage', { ip: item.ip })}
                        onLongPress={() => removeServer(item.id)}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 17, borderBottomWidth: 1, borderColor: 'white' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>{item.ip}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Modal Overlay für Serverliste */}
            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={{ color: '#DFDFDF', fontSize: 24 }}>Add Server</Text>

                        <View style={{ alignItems: 'center', height: '34%' }}>
                            <Text style={{ color: '#DFDFDF', fontSize: 17, margin: 10 }}>Enter Server IP-Address:</Text>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Type something..."
                                value={url}
                                onChangeText={handleInputChange}
                                autoFocus={true}
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.addButton} onPress={() => { ServerPing(); toggleModal(); }}>
                                <MaterialIcons name="add" size={24} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.deleteButton} onPress={toggleModal}>
                                <FontAwesome name="close" size={34} color="red" />
                            </TouchableOpacity>
                        </View>
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
        width: '100%',
        maxHeight: '100%'
    },
    modalContent: {
        backgroundColor: '#232D3F',
        padding: 50,
        borderRadius: 10,
        width: '80%',
        marginVertical: 68,
    },
    searchInput: {
        flex: 1,
        minHeight: 30,
        maxHeight: 30,
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        paddingLeft: 10,
        color: 'black',
    },
    addButton: {
        backgroundColor: '#005B41',
        padding: 10,
        borderRadius: 50,
        marginTop: 40,
        marginRight: 10,
    },
    deleteButton: {
        marginTop: 40,
    },
    searchServer: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 10,
        color: 'white',
        backgroundColor: 'white',
        margin: 10,
    },
});