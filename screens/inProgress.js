import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function InProgress() {
    const [inProgress, setInProgress] = useState([]);
    const todoCol = collection(db, 'ToDos');

    useEffect(() => {
        const getInProgressItems = async () => {
            const dataCol = await getDocs(todoCol);
            const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const inProgressList = data.filter(doc => doc.status == 1)
            setInProgress(inProgressList);
            // setInProgress(data);
            // setFullData(data);
        }
        getInProgressItems()
    }, [])


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header title="In progress" />
            <View style={styles.content}>
                <View style={styles.list}>
                    <FlatList
                        // ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.id}
                        data={inProgress}
                        renderItem={({ item }) => (
                            <TodoItem item={item} />
                        )}
                    />
                </View>
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