import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { removeItem, moveToInprogress, moveToDone } from '../redux/allData';

export default function TodoItem({ item, toDos, setToDos, db }) {

    const dispatch = useDispatch();

    const deleteHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        dispatch(removeItem(id));
        await deleteDoc(todoDoc);
    }

    const inProgressHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        const newStatus = { status: 1 };
        await updateDoc(todoDoc, newStatus);
        dispatch(moveToInprogress(id));
    }

    const doneHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        const newStatus = { status: 2 };
        await updateDoc(todoDoc, newStatus);
        dispatch(moveToDone(id));
    }

    const showInProgressButton = item.status == 1 ? <></> : <TouchableOpacity onPress={() => inProgressHandler(item.id)} style={styles.touchables} >
        <MaterialCommunityIcons name="progress-clock" size={20} color="black" />
    </TouchableOpacity>;

    const showDoneButton = item.status == 2 ? <></> : <TouchableOpacity onPress={() => doneHandler(item.id)} style={styles.touchables} >
        <MaterialCommunityIcons name="check" size={20} color="black" />
    </TouchableOpacity>;

    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <View style={styles.icons}>
                <TouchableOpacity onPress={() => deleteHandler(item.id)} style={styles.touchables} >
                    <MaterialCommunityIcons name="delete" size={20} color="#333" />
                </TouchableOpacity>
                {showInProgressButton}
                {showDoneButton}
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
        justifyContent: 'space-between',
    },
    itemText: {
        marginLeft: 10,
        flexShrink: 1
    },
    icons: {
        flexDirection: 'row'
    },
    touchables: {
        paddingLeft: 10
    }
})