import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Keyboard } from 'react-native';

export default function Search({ toDos, setToDos, fullData }) {
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

    const handleSearch = (query) => {
        const input = query.trim();
        const inputWithoutSpecialCharacters = input.replace(/[^a-zA-Z0-9 ]/g, '');
        const formattedQuery = inputWithoutSpecialCharacters.toLowerCase();
        const searchResult = fullData.filter(doc => doc.text.toLowerCase().includes(formattedQuery));
        setToDos(searchResult);
        setQuery(formattedQuery);
        Keyboard.dismiss()
    };

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='Search'
                value={query}
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