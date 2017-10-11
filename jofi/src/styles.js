import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  //ChatView

  outer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },

  messages: {
    flex: 1
  },

  //InputBar

  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  // ,
  // borderTopColor: 'black'
  textBox: {
    borderRadius: 5,
    borderWidth: 0,
    borderColor: 'white',
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: 'white'

  },
  //details
  shareButton: {

    backgroundColor: '#6ED6C1',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 0,
    marginTop: 5,
    paddingLeft: 15,
    marginLeft: 5,
    paddingRight: 15

  },

  shareButtonText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 15
  },

  textDetail: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 10,
    textAlign: 'left'
  },
  textDetailTitle: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'center'
  },
  title: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 20,
    textAlign: 'center'
  },
  details:{
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 12,
    textAlign: 'center'
  },

  //MessageBubble

  messageBubble: {
      borderRadius: 5,
      marginTop: 20,
      marginRight: 10,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#ECEFF1',
  },
  messageBubbleLeftList: {
    backgroundColor: '#8f77b7'
  },

  messageBubbleTextLeft: {
    color: 'black',
    fontFamily: 'Roboto'
  },

  messageBubbleRight: {
    backgroundColor: '#6ED6C1'
  },

  messageBubbleTextRight: {
    color: 'white',
    fontFamily: 'Roboto'
  },

  inputBarStyle:{
    borderColor: 'transparent'
  },

  modal: {
    backgroundColor:'white'
  },
// backgroundColor: "black",
  btnModal: {
    margin: 10,
    color: "black",
    padding: 10
  },
  btnInsideModal: {
    margin: 10,
    backgroundColor: "#8f77b7",
    color: "white",
    padding: 5
  },
  textModal: {
    color: "black",
    fontSize: 35,
    padding: 10,
    alignSelf: 'center'
  }
})

export default styles
