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


export default function Done() {

    const allItems = useSelector(state => state.toDo.item);
    const [done, setDone] = useState([]);

    useEffect(() => {
        const doneList = allItems.filter(doc => doc.status == 2)
        setDone(doneList);
    }, [allItems]);


    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Header title="Done" />
            <View style={styles.content}>
                <List
                    toDos={done}
                    setToDos={setDone}
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