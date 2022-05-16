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


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const todos = collection(db, 'ToDos');
// getDocs(todos).then((data) => {
//     console.log(data.size);
//     const sven = data.docs.map(doc => doc.data());
//     console.log(sven);
// });
// const docRef = doc(db, "ToDos", "ISA3QOTLTQ9d3NKuT8wb");
// getDoc(docRef).then(docSnap => {
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// });

export default function Home() {

    const [toDos, setToDos] = useState([]);
    const todoCol = collection(db, 'ToDos');

    useEffect(() => {
        const getToDoItems = async () => {
            const data = await getDocs(todoCol);
            setToDos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getToDoItems()
    }, [])

    // const [todos, setTodos] = useState([
    //     { text: 'buy teaaa', key: '1' },
    //     { text: 'create an app', key: '2' },
    //     { text: 'play on the switch', key: '3' }
    // ]);

    // const searchHandler = async () => {

    // }

    const addNewToDoHandler = async (text) => {
        if (text.length > 3) {
            const newTodo = await addDoc(todoCol, { text: text, status: 0 });
            const doc = await getDoc(newTodo);
            setToDos([...toDos, { ...doc.data(), id: doc.id }])
            // console.log('ny', doc.data());
        } else {
            Alert.alert('Oops!', 'Todos must be over 3 chars long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }

    const deleteHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id)
        await deleteDoc(todoDoc);
    }

    const inProgressHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id)
        const newStatus = { status: 1 }
        await updateDoc(todoDoc, newStatus)
        //console.log('done was clicked');
    }

    const doneHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id)
        const newStatus = { status: 2 }
        await updateDoc(todoDoc, newStatus)
        //console.log('done was clicked');
    }

    // const submitHandler = async (text) => {

    //     if (text.length > 3) {
    //         setToDos((prevToDos) => {
    //             return [
    //                 { text: text, status: 0, id: Math.random().toString() },
    //                 ...prevToDos
    //             ]
    //         })
    //     } else {
    //         Alert.alert('Oops!', 'Todos must be over 3 chars long', [
    //             { text: 'Understood', onPress: () => console.log('alert closed') }
    //         ])
    //     }
    // }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style={styles.container}>
                <StatusBar style="auto" />
                <Header />
                <View style={styles.content}>
                    {/* <SearchTodo searchHandler={ } /> */}
                    <AddTodo submitHandler={addNewToDoHandler} />
                    <View style={styles.list}>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={toDos}
                            renderItem={({ item }) => (
                                <TodoItem item={item} deleteHandler={deleteHandler} inProgressHandler={inProgressHandler} doneHandler={doneHandler} />
                            )}
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
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