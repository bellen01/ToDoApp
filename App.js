import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './screens/home';
import InProgress from './screens/inProgress';
import Done from './screens/done';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { fetchToDos } from './redux/allData';


const Tab = createMaterialTopTabNavigator();


export default function App() {

  store.dispatch(fetchToDos());


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


