import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
// import { connect } from 'react-redux'
// import { setUsernameAction } from '../actions'
import SplashScreen from 'react-native-splash-screen'

export default class Splash extends Component {


  componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#F5FCFF'
  },
  title: {
    color: '#000'
  },
  titleContainer: {
    alignItems: 'center'
  },
  textInputContainer: {
    padding: 20
  },
  inputPlace: {
    marginBottom: 10,
    height: 50,
  },
  buttonBox: {
    paddingVertical: 15,
    // backgroundColor: '#0082fc'
    backgroundColor: '#2D1E46'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
})
