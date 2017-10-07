import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
//
// import {
//   StackNavigator,
// } from 'react-navigation';
//
// import Splash from './Splash'
// import ChatView from './ChatView'
// import List from './ListDemo'
// import Detail from './Details'

import SplashScreen from 'react-native-splash-screen'

export default class jofi extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }
}


//
// const jofi = StackNavigator({
//   Splash: {screen: Splash},
//   Main: {screen: ChatView},
//   List: {screen: List},
//   Details: {screen: Detail}
//
// });

console.ignoredYellowBox = ['warning: View.protoTypes'];



AppRegistry.registerComponent('jofi', () => jofi);
