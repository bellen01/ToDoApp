import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { InteractionManager } from 'react-native';
// import { setInProgress } from '../redux/inProgressSlice';
import List from '../components/list';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function InProgress() {

    const allItems = useSelector((state) => state.toDo.item);
    // const dispatch = useDispatch();
    // const allInProgress = useSelector((state) => state.inProgress.inProgress);

    console.log('allItems InProgress', allItems);
    // console.log('allInProgress', allInProgress);

    const [inProgress, setInProgress] = useState([]);
    const todoCol = collection(db, 'ToDos');

    // useFocusEffect(
    //     useCallback(() => {
    //         const task = InteractionManager.runAfterInteractions(() => {
    //             const inProgressList = allItems.filter(doc => doc.status == 1)
    //             setInProgress(inProgressList);
    //             // console.log('inprogressList', inProgressList);
    //             console.log('focus was triggered')
    //             console.log('allItems in focus', allItems);
    //         });

    //         return () => task.cancel();
    //     }, [allItems])
    // );

    useEffect(() => {
        // const getInProgressItems = async () => {
        //     const dataCol = await getDocs(todoCol);
        //     const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        //     const inProgressList = data.filter(doc => doc.status == 1)
        const inProgressList = allItems.filter(doc => doc.status == 1)
        setInProgress(inProgressList);
        // console.log('inprogressList', inProgressList);
        console.log('focus was triggered')
        console.log('allItems in focus', allItems);
        // }
        // getInProgressItems()
    }, [allItems]);

    console.log('inProgressState', inProgress);


    // useEffect(() => {
    //     const inProgressList = allItems.filter(doc => doc.status == 1)
    //     setInProgress(inProgressList);
    //     console.log('inprogressList', inProgressList);
    //     // const getInProgressItems = async () => {
    //     //     const dataCol = await getDocs(todoCol);
    //     //     const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //     //     const inProgressList = data.filter(doc => doc.status == 1)
    //     //     // const inProgressList = allItems.filter(doc => doc.status == 1)
    //     //     setInProgress(inProgressList);
    //     //     // dispatch(setInProgress(inProgressList));
    //     //     // setInProgress(data);
    //     //     // setFullData(data);
    //     // }
    //     // getInProgressItems()
    // }, [])


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header title="In progress" />
            <View style={styles.content}>
                <List toDos={inProgress} setToDos={setInProgress} db={db} />
                {/* <View style={styles.list}>
                    <FlatList
                        // ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.id}
                        data={inProgress}
                        renderItem={({ item }) => (
                            <TodoItem item={item} toDos={inProgress} setToDos={setInProgress} db={db} />
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