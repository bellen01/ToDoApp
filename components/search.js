import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';

export default function Search({ /*searchHandler, clearSearch*/ toDos, setToDos, fullData }) {
    const [query, setQuery] = useState('');

    const changeHandler = (val) => {
        setQuery(val);
    }

    const onClear = () => {
        clearSearch();
        setQuery('');
    }

    const clearSearch = () => {
        setToDos(fullData);
        Keyboard.dismiss();
    }

    // search
    const handleSearch = (input) => {
        const inputWithoutSpecialCharacters = input.replace(/[^a-zA-Z0-9 ]/g, '');
        const formattedQuery = inputWithoutSpecialCharacters.toLowerCase();
        const searchResult = toDos.filter(doc => doc.text.toLowerCase().includes(formattedQuery));
        setToDos(searchResult);
        setQuery(formattedQuery);
        Keyboard.dismiss()
        console.log('input utan ändring', input);
        console.log('input utan specialtecken', inputWithoutSpecialCharacters);
        console.log('input utan specialtecken och lowercase', formattedQuery);
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='Search'
                value={query}
                // onChangeText={(val) => searchHandler(val)}
                onChangeText={changeHandler}
            />
            <View style={styles.buttons}>
                <View style={styles.buttonSearch}>
                    <Button onPress={() => handleSearch(query)} title='Search' color='coral' />
                </View>
                <View style={styles.buttonClear}>
                    <Button onPress={onClear} title='Clear' color='coral' />
                </View>
            </View>
        </View>
    )

    // return (
    //     <View>
    //         <TextInput
    //             style={styles.input}
    //             placeholder='Search'
    //             onChangeText={(val) => handleSearch(val)}
    //         />
    //         <View style={styles.icons}>
    //                     <TouchableOpacity onPress={clearSearch} style={styles.touchables} >
    //                         <MaterialCommunityIcons name="close" size={24} color="black" />
    //                     </TouchableOpacity>
    //                 </View>
    //     </View>
    // )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    icons: {
        flexDirection: 'row'
    },
    // search: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between'
    // },
    touchables: {
        paddingLeft: 5
    },
    buttons: {
        flexDirection: 'row'
    },
    buttonSearch: {
        flex: 1,
        marginRight: 2
    },
    buttonClear: {
        flex: 1,
        marginLeft: 2
    }
})