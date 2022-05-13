import React from 'react';
import Home from './screens/home';

export default function App() {
  return (
    <Home />
  );
}

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
