import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './screens/home';
import InProgress from './screens/inProgress';
import Done from './screens/done';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, getDocs } from 'firebase/firestore';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration


// // Initialize Firebase
// initializeApp(firebaseConfig);



// const data = await getDocs({ firestore, type: 'ToDos' });
// console.log(data);

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBv6LT3u6iVX6UhVp5dCKKaTORufJHWySE",
  authDomain: "to-do-app-e6930.firebaseapp.com",
  projectId: "to-do-app-e6930",
  storageBucket: "to-do-app-e6930.appspot.com",
  messagingSenderId: "863612596390",
  appId: "1:863612596390:web:56489eb82128bb56798467"
};

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, DocumentReference, doc } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const todos = collection(db, 'ToDos');
getDocs(todos).then((data) => {
  console.log(data.size);
  const sven = data.docs.map(doc => doc.data());
  console.log(sven);
});
const docRef = doc(db, "ToDos", "ISA3QOTLTQ9d3NKuT8wb");
getDoc(docRef).then(docSnap => {
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
});




// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// let app;

// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig)
// } else {
//   app = firebase.app();
// }

// const db = app.firestore();
// const firestore = getFirestore();
// const auth = firebase.auth();

// getDocs({
//   firestore,
//   type: 'ToDos'
// }).then((data) => console.log(data));
// // console.log(data);

// export { db, auth };


const Tab = createMaterialTopTabNavigator();

// const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator style={styles.topBar}>
        <Tab.Screen name="To Do" component={Home} />
        <Tab.Screen name="In Progress" component={InProgress} />
        <Tab.Screen name="Done" component={Done} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: 30
  }
})

// import { StatusBar } from 'expo-status-bar';
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
// import Header from './components/header';
// import TodoItem from './components/todoItem';
// import AddTodo from './components/addTodo';


// export default function App() {

//   const [todos, setTodos] = useState([
//     { text: 'buy coffee', key: '1' },
//     { text: 'create an app', key: '2' },
//     { text: 'play on the switch', key: '3' }
//   ]);

//   const deleteHandler = (key) => {
//     setTodos((prevTodos) => {
//       return prevTodos.filter(todo => todo.key != key)
//     })
//   }

//   const inProgressHandler = (key) => {
//     console.log('inProgress was clicked');
//   }

//   const doneHandler = (key) => {
//     console.log('done was clicked');
//   }

//   const submitHandler = (text) => {

//     if (text.length > 3 && text == '') {
//       setTodos((prevTodos) => {
//         return [
//           { text: text, key: Math.random().toString() },
//           ...prevTodos
//         ]
//       });
//     } else {
//       Alert.alert('Oops!', 'Todos must be over 3 chars long', [
//         { text: 'Understood', onPress: () => console.log('alert closed') }
//       ])
//     }
//   }

//   return (
//     <TouchableWithoutFeedback onPress={() => {
//       Keyboard.dismiss();
//     }}>
//       <View style={styles.container}>
//         <StatusBar style="auto" />
//         <Header />
//         <View style={styles.content}>
//           <AddTodo submitHandler={submitHandler} />
//           <View style={styles.list}>
//             <FlatList
//               data={todos}
//               renderItem={({ item }) => (
//                 <TodoItem item={item} deleteHandler={deleteHandler} inProgressHandler={inProgressHandler} doneHandler={doneHandler} />
//               )}
//             />
//           </View>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     padding: 40,
//     flex: 1,
//   },
//   list: {
//     marginTop: 20,
//     flex: 1,
//   }
// });
