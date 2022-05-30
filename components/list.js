import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import TodoItem from '../components/todoItem';


export default function List({ toDos, setToDos, db }) {

    return (
        <View style={styles.list}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={toDos}
                renderItem={({ item }) => (
                    <TodoItem item={item} toDos={toDos} setToDos={setToDos} db={db} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        flex: 1,
    }
});