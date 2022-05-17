import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

    const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    useEffect(() => {
        const getToDoItems = async () => {
            const dataCol = await getDocs(todoCol);
            const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const toDoList = data.filter(doc => doc.status == 0)
            setToDos(toDoList);
            setFullData(toDoList);
            // setToDos(data);
            // setFullData(data);
        }
        getToDoItems()
    }, [])


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
        setToDos((prevToDos) => {
            return prevToDos.filter(todo => todo.id != id)
        })
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



    function renderHeader() {
        return (
            <View
                style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    marginVertical: 10,
                    borderRadius: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    // clearButtonMode="always"
                    value={query}
                    onChangeText={queryText => handleSearch(queryText)}
                    placeholder="Search"
                    style={{
                        backgroundColor: '#fff',
                    }}
                />
                <View style={styles.icons}>
                    <TouchableOpacity onPress={clearSearch} style={styles.touchables}>
                        <MaterialCommunityIcons name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    const clearSearch = () => {
        setQuery('');
        setToDos(fullData);
    }

    // search
    const handleSearch = (input) => {
        setQuery(input);
        // const formattedQuery = input.toLowerCase();
        // const searchResult = toDos.filter(doc => doc.text.toLowerCase().includes(formattedQuery));
        // setToDos(searchResult);
    };


    // search
    // const handleSearch = (input) => {
    //     const formattedQuery = input.toLowerCase();
    //     const filteredData = filter(fullData, text => {
    //         return contains(text, formattedQuery);
    //     });
    //     setFullData(filteredData);
    //     setQuery(input);
    // };

    // const contains = ({ text }, query) => {
    //     const { text } = text;
    //     if (text.includes(query)) {
    //         return true;
    //     }
    //     return false;
    // }

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
                <Header title="To Do's" />
                <View style={styles.content}>
                    {/* <SearchTodo searchHandler={ } /> */}
                    <AddTodo submitHandler={addNewToDoHandler} />
                    <View style={styles.list}>
                        <FlatList
                            ListHeaderComponent={renderHeader}
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
    },
    touchables: {
        paddingLeft: 5
    }
});