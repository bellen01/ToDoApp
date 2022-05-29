import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import TodoItem from '../components/todoItem';
import AddTodo from '../components/addTodo';
import SearchTodo from '../components/search';
import { firebaseConfig } from '../config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, DocumentReference, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import filter from 'lodash.filter';
import { TextInput } from 'react-native-gesture-handler';
import { contains } from '@firebase/util';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import List from '../components/list';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Done() {
    const allData = useSelector(state => state.toDo.item);

    const [done, setDone] = useState([]);
    const todoCol = collection(db, 'ToDos');

    useFocusEffect(
        useCallback(() => {
            const getDoneItems = async () => {
                //TODO This works with delete
                const dataCol = await getDocs(todoCol);
                const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                const doneList = data.filter(doc => doc.status == 2)
                //TODO this don't work with delete
                // const doneList = allData.filter(doc => doc.status == 2)
                setDone(doneList);
                console.log('doneList', doneList);
                // setDone(data);
                // setFullData(data);
            }
            getDoneItems()
        }, [allData])
    );

    // useEffect(() => {
    //     const getInProgressItems = async () => {
    //         const dataCol = await getDocs(todoCol);
    //         const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //         const doneList = data.filter(doc => doc.status == 2)
    //         setDone(doneList);
    //         // setDone(data);
    //         // setFullData(data);
    //     }
    //     getInProgressItems()
    // }, [])


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header title="Done" />
            <View style={styles.content}>
                <List toDos={done} setToDos={setDone} db={db} />
                {/* <View style={styles.list}>
                    <FlatList
                        // ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.id}
                        data={done}
                        renderItem={({ item }) => (
                            <TodoItem item={item} toDos={done} setToDos={setDone} db={db} />
                        )}
                    />
                </View> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 40,
        flex: 1,
    },
    list: {
        marginTop: 20,
        flex: 1,
    }
});