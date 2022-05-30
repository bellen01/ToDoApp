import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../components/header';
import AddTodo from '../components/addTodo';
import Search from '../components/search';
import { firebaseConfig } from '../config';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, addDoc } from 'firebase/firestore/lite';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/allData';
import List from '../components/list';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Home() {

    const allItems = useSelector((state) => state.toDo.item);
    const dispatch = useDispatch();

    const [toDos, setToDos] = useState([]);
    const [fullData, setFullData] = useState([]);

    const todoCol = collection(db, 'ToDos');
    const regEx = /^[^!-\/:-@\[-`{-~]*$/;


    useEffect(() => {
        const toDoList = allItems.filter(doc => doc.status == 0);
        setToDos(toDoList);
        setFullData(toDoList);
    }, [allItems]);


    const addNewToDoHandler = async (text, setText) => {
        const input = text.trim();
        if (regEx.test(input) === false) {
            Alert.alert('Sorry', 'you can not add todos with special characters.', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        } else if (input.length > 2) {
            const newTodo = await addDoc(todoCol, { text: input, status: 0 });
            const doc = await getDoc(newTodo);
            const docWithId = { ...doc.data(), id: doc.id };
            dispatch(addItem(docWithId));
            Keyboard.dismiss();
            setText('');
        } else {
            Alert.alert('Oops!', 'Todos must be over 2 chars long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }


    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Header title="To Do's" />
                <View style={styles.content}>
                    <AddTodo submitHandler={addNewToDoHandler} />
                    <Search setToDos={setToDos} fullData={fullData} toDos={toDos} />
                    <List toDos={toDos} setToDos={setToDos} db={db} />
                </View>
            </View>
        </TouchableWithoutFeedback >
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
    },
    touchables: {
        paddingLeft: 5
    },
    icons: {
        flexDirection: 'row'
    },
    search: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
    }
});