import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Header from './components/header';

export default function TodoItem({ item, deleteHandler, inProgressHandler, doneHandler }) {

    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <View style={styles.icons}>
                <TouchableOpacity onPress={() => deleteHandler(item.key)} style={styles.touchables} >
                    <MaterialCommunityIcons name="delete" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => inProgressHandler(item.key)} style={styles.touchables} >
                    <MaterialCommunityIcons name="progress-clock" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => doneHandler(item.key)} style={styles.touchables} >
                    <MaterialCommunityIcons name="check" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemText: {
        marginLeft: 10,
    },
    icons: {
        flexDirection: 'row'
    },
    touchables: {
        paddingLeft: 5
    }
})