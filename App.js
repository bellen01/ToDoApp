import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './screens/home';
import InProgress from './screens/inProgress';
import Done from './screens/done';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


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


