import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, /*FlatList, Alert, TouchableWithoutFeedback, Keyboard*/ } from 'react-native';
import Header from '../components/header';
//import TodoItem from '../components/todoItem';
import { firebaseConfig } from '../config';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';
import List from '../components/list';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Done() {

    const allData = useSelector(state => state.toDo.item);
    const [done, setDone] = useState([]);

    useEffect(() => {
        const doneList = allData.filter(doc => doc.status == 2)
        setDone(doneList);
    }, [allData]);


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