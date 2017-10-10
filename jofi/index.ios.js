

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
import List from './ListDemo'
import Detail from './Details'


const jofi = StackNavigator({
  Main: {screen: ChatView},
  List: {screen: List},
  Details: {screen: Detail}

});

console.ignoredYellowBox = ['warning: View.protoTypes'];


AppRegistry.registerComponent('jofi', () => jofi);
