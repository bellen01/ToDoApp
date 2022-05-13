import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Done() {
    return (
        <View style={styles.container}>
            <Text>Done screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
});