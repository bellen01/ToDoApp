import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../components/header';
import { firebaseConfig } from '../config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';
import List from '../components/list';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function InProgress() {

    const allItems = useSelector((state) => state.toDo.item);
    const [inProgress, setInProgress] = useState([]);

    useEffect(() => {
        const inProgressList = allItems.filter(doc => doc.status == 1)
        setInProgress(inProgressList);
    }, [allItems]);


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header title="In progress" />
            <View style={styles.content}>
                <List
                    toDos={inProgress}
                    setToDos={setInProgress}
                    db={db}
                />
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
    }
});