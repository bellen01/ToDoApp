import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Home from './screens/home';
import InProgress from './screens/inProgress';
import Done from './screens/done';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useDispatch } from 'react-redux';
import { setItems } from './redux/allData';
import { fetchToDos } from './redux/allData';

//nytt från home
// import { firebaseConfig } from './config';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs, getDoc, DocumentReference, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const Tab = createMaterialTopTabNavigator();


export default function App() {


  store.dispatch(fetchToDos());
  console.log('fetchDone');

  // const [toDos, setToDos] = useState([]);
  // const todoCol = collection(db, 'ToDos');

  // const [fullData, setFullData] = useState([]);

  // useEffect(() => {
  //   const getToDoItems = async () => {
  //     const dataCol = await getDocs(todoCol);
  //     const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     const toDoList = data.filter(doc => doc.status == 0)
  //     setToDos(toDoList);
  //     setFullData(toDoList);
  //     console.log(data);
  //     // setToDos(data);
  //     // setFullData(data);
  //   }
  //   getToDoItems()
  // }, [])

  // console.log(toDos);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const getToDoItems = async () => {
  //     const dataCol = await getDocs(todoCol);
  //     const data = dataCol.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     dispatch(setItems(data));
  //     console.log('björn');
  //   }
  //   getToDoItems();
  // }, [])


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator style={styles.topBar}>
          <Tab.Screen name="To Do" component={Home} />
          <Tab.Screen name="In Progress" component={InProgress} />
          <Tab.Screen name="Done" component={Done} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginTop: 30
  }
})


