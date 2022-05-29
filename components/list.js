import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/header';
import TodoItem from '../components/todoItem';
import AddTodo from '../components/addTodo';
import Search from '../components/search';
import { firebaseConfig } from '../config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, DocumentReference, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import filter from 'lodash.filter';
import { TextInput } from 'react-native-gesture-handler';
import { contains } from '@firebase/util';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import { keyboardProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, clearTodo, setItems, removeTodo, moveToInprogress, moveToDone } from '../redux/allData';
import { useFocusEffect } from '@react-navigation/native';
import { InteractionManager } from 'react-native';


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


export default function List({ toDos, setToDos, db }) {

    // const allItems = useSelector((state) => state.toDo.item);
    // const dispatch = useDispatch();

    // console.log('sven', allItems);




    // const [toDos, setToDos] = useState([]);
    // const todoCol = collection(db, 'ToDos');

    // const [fullData, setFullData] = useState([]);



    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={toDos}
                renderItem={({ item }) => (
                    <TodoItem item={item} toDos={toDos} setToDos={setToDos} db={db} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        flex: 1,
    }
});