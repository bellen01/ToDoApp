// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

// export default function SearchTodo({ searchHandler }) {
//     const [text, setText] = useState('');

//     const changeHandler = (val) => {
//         setText(val);
//     }

//     return (
//         <View>
//             <TextInput
//                 style={styles.input}
//                 placeholder='Search for todo here'
//                 onChangeText={changeHandler}
//             />
//             <Button onPress={() => searchHandler(text)} title='search' color='coral' />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     input: {
//         marginBottom: 10,
//         paddingHorizontal: 8,
//         paddingVertical: 6,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd'
//     }
// })