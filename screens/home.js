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

    const allItems = useSelector((state) => state.toDo.item);
    const dispatch = useDispatch();

    console.log('sven', allItems);




    const [toDos, setToDos] = useState([]);
    const todoCol = collection(db, 'ToDos');

    // const [query, setQuery] = useState('');
    const [fullData, setFullData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const task = InteractionManager.runAfterInteractions(async () => {
                const getToDoItems = async () => {
                    //TODO: breakout getDocs and data
                    const dataCol = await getDocs(todoCol);
                    const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

                    // const toDoList = allItems.filter(doc => doc.status == 0);
                    const toDoList = data.filter(doc => doc.status == 0);
                    setToDos(toDoList);
                    dispatch(setItems(data));
                    console.log('sven', allItems);
                    setFullData(toDoList);
                    // setToDos(data);
                    // setFullData(data);
                };
                getToDoItems();
                // const toDoList = allItems.filter(doc => doc.status == 0);
                // setToDos(toDoList);
            });

            return () => task.cancel();
        }, [])
    );


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


    const addNewToDoHandler = async (text) => {
        if (text.length > 3) {
            const newTodo = await addDoc(todoCol, { text: text, status: 0 });
            const doc = await getDoc(newTodo);
            const docWithId = { ...doc.data(), id: doc.id };
            //TODO: ändra nedan till allItems eller docWithId?
            setToDos([...toDos, docWithId]);
            dispatch(addTodo(docWithId));
            // console.log('ny', doc.data());
        } else {
            Alert.alert('Oops!', 'Todos must be over 3 chars long', [
                { text: 'Understood', onPress: () => console.log('alert closed') }
            ])
        }
    }

    // const deleteHandler = async (id) => {
    //     const todoDoc = doc(db, 'ToDos', id);
    //     await deleteDoc(todoDoc);
    //     setToDos((prevToDos) => {
    //         return prevToDos.filter(todo => todo.id != id)
    //     });
    //     dispatch(removeTodo(id));
    // }

    const inProgressHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        const newStatus = { status: 1 };
        await updateDoc(todoDoc, newStatus);
        dispatch(moveToInprogress(id));
        // const updatedDoc = setToDos.find(doc => doc.id == id);
        // updatedDoc.status = 1;
        // const updatedId = 
        // setInProgress((prevInProgress) => {
        // }
        //console.log('done was clicked');
    }

    const doneHandler = async (id) => {
        const todoDoc = doc(db, 'ToDos', id);
        const newStatus = { status: 2 };
        await updateDoc(todoDoc, newStatus);
        dispatch(moveToDone(id));
        //console.log('done was clicked');
    }



    // function renderHeader() {
    //     return (
    //         <View
    //             style={{
    //                 backgroundColor: '#fff',
    //                 padding: 10,
    //                 marginVertical: 10,
    //                 borderRadius: 20,
    //                 flexDirection: 'row',
    //                 justifyContent: 'space-between'
    //             }}
    //         >
    //             <TextInput
    //                 autoCapitalize='none'
    //                 autoCorrect={false}
    //                 // clearButtonMode="always"
    //                 value={query}
    //                 onChangeText={(val) => handleSearch(val)}
    //                 placeholder="Search"
    //                 style={{
    //                     backgroundColor: '#fff',
    //                 }}
    //             />
    //             <View style={styles.icons}>
    //                 <TouchableOpacity onPress={clearSearch} style={styles.touchables} >
    //                     <MaterialCommunityIcons name="close" size={24} color="black" />
    //                 </TouchableOpacity>
    //             </View>

    //         </View>
    //     )
    // }



    const clearSearch = () => {
        setToDos(fullData);
    }

    // search
    const handleSearch = (input) => {
        const formattedQuery = input.toLowerCase();
        const searchResult = toDos.filter(doc => doc.text.toLowerCase().includes(formattedQuery));
        setToDos(searchResult);
        Keyboard.dismiss()
    };




    //renderHeader funktion som inte fungerar
    // const changeHandler = (val) => {
    //     setQuery(val);
    // }

    // function renderHeader() {
    //     return (
    //         <View
    //             style={styles.search}
    //         >
    //             <TextInput
    //                 style={styles.input}
    //                 placeholder='Search'
    //                 onChangeText={changeHandler}
    //                 value={query}
    //             />
    //             <View style={styles.icons}>
    //                 <TouchableOpacity onPress={clearSearch} style={styles.touchables} >
    //                     <MaterialCommunityIcons name="close" size={24} color="black" />
    //                 </TouchableOpacity>
    //                 <TouchableOpacity onPress={() => handleSearch(query)} style={styles.touchables} >
    //                     <MaterialCommunityIcons name="magnify" size={24} color="black" />
    //                 </TouchableOpacity>
    //             </View>

    //         </View>
    //     )
    // }

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
                    <Search searchHandler={handleSearch} clearSearch={clearSearch} />
                    <View style={styles.list}>
                        <FlatList
                            // ListHeaderComponent={renderHeader}
                            keyExtractor={(item) => item.id}
                            data={toDos}
                            renderItem={({ item }) => (
                                <TodoItem item={item} /* deleteHandler={deleteHandler} */ inProgressHandler={inProgressHandler} doneHandler={doneHandler} toDos={toDos} setToDos={setToDos} db={db} />
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