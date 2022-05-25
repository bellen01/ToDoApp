import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore/lite';
import { removeTodo, moveToInprogress, moveToDone } from '../redux/allData';
// import Header from './components/header';

export default function TodoItem({ item, /*deleteHandler,*/ /*inProgressHandler,*/ /*doneHandler,*/ toDos, setToDos, db }) {

    const dispatch = useDispatch();

    const deleteHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        dispatch(removeTodo(id));
        // setToDos((prevToDos) => {
        //     return prevToDos.filter(todo => todo.id != id)
        // });
        await deleteDoc(todoDoc);
        console.log('delete was pressed');
        // console.log('setToDos in deleteHandler', setToDos);
    }

    const inProgressHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        const newStatus = { status: 1 };
        await updateDoc(todoDoc, newStatus);
        dispatch(moveToInprogress(id));
        // const updatedDoc = setToDos.find(doc => doc.id == id);
        // updatedDoc.status = 1;
        // const updatedId = 
        // setInProgress((prevInProgress) => {
        // }
        //console.log('done was clicked');
    }

    const doneHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        const newStatus = { status: 2 };
        await updateDoc(todoDoc, newStatus);
        dispatch(moveToDone(id));
        //console.log('done was clicked');
    }

    return (
        <View style={styles.item}>
            <Text style={styles.itemText}>{item.text}</Text>
            <View style={styles.icons}>
                <TouchableOpacity onPress={() => deleteHandler(item.id)} style={styles.touchables} >
                    <MaterialCommunityIcons name="delete" size={20} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => inProgressHandler(item.id)} style={styles.touchables} >
                    <MaterialCommunityIcons name="progress-clock" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => doneHandler(item.id)} style={styles.touchables} >
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