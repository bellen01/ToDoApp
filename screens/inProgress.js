import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function InProgress() {
    return (
        <View style={styles.container}>
            <Text>In progress screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24
    }
});