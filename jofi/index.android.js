/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

import Welcome from './Welcome'
import ChatView from './ChatView'
import List from './ListDemo'
import Detail from './Details'


const jofi = StackNavigator({
  Welcome: {screen: Welcome},
  Main: {screen: ChatView},
  List: {screen: List},
  Details: {screen: Detail}

});

console.ignoredYellowBox = ['warning: View.protoTypes'];


// export default class jofi extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }

AppRegistry.registerComponent('jofi', () => jofi);
