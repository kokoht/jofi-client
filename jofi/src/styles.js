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
    paddingVertical: 3,
    borderTopColor: 'black'
  },

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
    backgroundColor: '#6ED6C1'

  },

  //MessageBubble

  messageBubble: {
      borderRadius: 5,
      marginTop: 8,
      marginRight: 10,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      flex: 1
  },

  messageBubbleLeft: {
    backgroundColor: '#d5d8d4',
  },
  messageBubbleLeftList: {
    backgroundColor: '#8f77b7',
  },

  messageBubbleTextLeft: {
    color: 'black'
  },

  messageBubbleRight: {
    backgroundColor: '#6ED6C1'
  },

  messageBubbleTextRight: {
    color: 'white'
  },

  inputBarStyle:{
    borderColor: 'transparent'
  },

  btnModal: {
    margin: 10,
    backgroundColor: "black",
    color: "black",
    padding: 10,
    borderTopColor: 'black'
  },
  btnInsideModal: {
    margin: 10,
    backgroundColor: "#8f77b7",
    color: "white",
    padding: 10
  },
  textModal: {
    color: "black",
    fontSize: 35,
    padding: 10,
    alignSelf: 'center'
  }
})

export default styles
