
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation';

import ChatView from './ChatView'
// import Menu from './Menu'
// import Integrate from './Integrate'
// import Siap from './Siap'

const jofi = StackNavigator({
  // Siap: {screen: Siap},
  // Integrate: {screen: Integrate},
  // Menu: {screen: Menu},
  Main: {screen: ChatView}
});



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

console.ignoredYellowBox = ['warning: View.protoTypes'];

AppRegistry.registerComponent('jofi', () => jofi);
