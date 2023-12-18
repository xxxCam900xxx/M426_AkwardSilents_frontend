import React from 'react'
import { FlatList, Text, View } from 'react-native'

function ChatPage() {
    const messagges = [
        {sender: 'niel', time: new Date(), chatId: 5, text: 'hallo wie gehts?'},
        {sender: 'linus', time: new Date(), chatId: 5, text: 'gut und dir?'},
        {sender: 'sandro', time: new Date(), chatId: 5, text: 'mir gehts auch gut und euch'},
    ]

    const user = 'linus'
    return (
        <View>
            <Text>ChatPage</Text>
            <FlatList data={messagges} renderItem={({item}) =>
                <Text style={styles.item}>{item.sender}</Text>
            }>
            </FlatList>
        </View>
    )
}

export default ChatPage