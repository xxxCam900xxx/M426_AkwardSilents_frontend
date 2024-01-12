import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
    ]);
    const [search, setSearch] = useState('');
    const [filteredServers, setFilteredServers] = useState(servers);

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
        if (!url) {
            console.error('URL is empty');
            return;
        }

        try {
            // Make a HEAD request to the server
            const response = await fetch(`http://${url}`);

            // Check if the response is successful (status code 200-299)
            if (response.ok) {
                setServerReachable(true);
                console.log('Server is reachable');
                // Generate a unique ID for the new server
                const serverId = generateUniqueId(); // You should replace this with your logic
                // Update the state to add the new server
                setServers([...servers, { id: serverId, ip: url }]);
                navigation.navigate('FriendsPage', { ip: url });
            } else {
                console.log('Server returned an error:', response.status, response.statusText);
                setServerReachable(false);
            }
        } catch (error) {
            console.error('Error during network request:', error);
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

            {/* Modal Overlay für Personenliste */}
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
                            />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.addButton} onPress={() => { ServerPing(); toggleModal(); }}>
                                <MaterialIcons name="add" size={24} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={toggleModal}>
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
    },
    modalContent: {
        backgroundColor: '#232D3F',
        padding: 50,
        borderRadius: 10,
        width: '80%',
        height: '40%',
        marginVertical: 68,
    },
    searchInput: {
        flex: 1,
        height: 40,
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
        marginRight: 10,
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