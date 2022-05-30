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
import List from '../components/list';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default function Home() {

    const allItems = useSelector((state) => state.toDo.item);
    const dispatch = useDispatch();

    const [toDos, setToDos] = useState([]);
    const todoCol = collection(db, 'ToDos');

    // const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    useEffect(() => {
        // const getToDoItems = async () => {
        //TODO: breakout getDocs and data
        // const dataCol = await getDocs(todoCol);
        // const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const toDoList = allItems.filter(doc => doc.status == 0);
        // const toDoList = data.filter(doc => doc.status == 0);
        setToDos(toDoList);
        // dispatch(setItems(data));
        console.log('sven', allItems);
        setFullData(toDoList);
        // setToDos(data);
        // setFullData(data);
        // };
        // getToDoItems();
        // const toDoList = allItems.filter(doc => doc.status == 0);
        // setToDos(toDoList);
    }, [allItems]);

    // useFocusEffect(
    //     useCallback(() => {
    //         const task = InteractionManager.runAfterInteractions(async () => {
    //             // const getToDoItems = async () => {
    //             //TODO: breakout getDocs and data
    //             // const dataCol = await getDocs(todoCol);
    //             // const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    //             const toDoList = allItems.filter(doc => doc.status == 0);
    //             // const toDoList = data.filter(doc => doc.status == 0);
    //             setToDos(toDoList);
    //             // dispatch(setItems(data));
    //             console.log('sven', allItems);
    //             setFullData(toDoList);
    //             // setToDos(data);
    //             // setFullData(data);
    //             // };
    //             // getToDoItems();
    //             // const toDoList = allItems.filter(doc => doc.status == 0);
    //             // setToDos(toDoList);
    //         });

    //         return () => task.cancel();
    //     }, [allItems])
    // );


    // useEffect(() => {
    //     const getToDoItems = async () => {
    //         //TODO: breakout getDocs and data
    //         const dataCol = await getDocs(todoCol);
    //         const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    //         const toDoList = data.filter(doc => doc.status == 0)
    //         setToDos(toDoList);
    //         dispatch(setItems(data));
    //         console.log('sven');
    //         // setFullData(toDoList);
    //         // setToDos(data);
    //         // setFullData(data);
    //     }
    //     getToDoItems()
    // }, [])

    const regEx = /^[^!-\/:-@\[-`{-~]+$/;

    const addNewToDoHandler = async (text, setText) => {
        if (regEx.test(text) === false) {
            Alert.alert('Sorry', 'you can not add todos with special characters.', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        } else if (text.length > 3) {
            const newTodo = await addDoc(todoCol, { text: text, status: 0 });
            const doc = await getDoc(newTodo);
            const docWithId = { ...doc.data(), id: doc.id };
            dispatch(addTodo(docWithId));
            Keyboard.dismiss();
            setText('');
        } else {
            Alert.alert('Oops!', 'Todos must be over 3 chars long', [
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
                    {/* <View style={styles.list}>
                        <FlatList
                            // ListHeaderComponent={renderHeader}
                            keyExtractor={(item) => item.id}
                            data={toDos}
                            renderItem={({ item }) => (
                                <TodoItem item={item} /* deleteHandler={deleteHandler} */ /*inProgressHandler={inProgressHandler} doneHandler={doneHandler}*/ /* toDos={toDos} setToDos={setToDos} db={db} />
                            )}
                        />
                            </View>*/}
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
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd'
    }
});