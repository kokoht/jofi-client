import React, { Component } from 'react';
import { Alert, Text, View, FlatList, StyleSheet, AsyncStorage, Image, ScrollView, Button, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard,  Dimensions} from 'react-native';
import styles from '../styles'

export default class MessageBubble extends Component {
  render() {
    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 70}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 70}}/> : null;
    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];
    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>

        {this.props.direction === 'left' ?
          <Image
            style={{width: 36, height: 36, borderRadius: 18, alignSelf: 'center', marginLeft: 16}}
            source={require('../jofi.jpg')}
          /> : null}

          {leftSpacer}

          <View style={bubbleStyles}>
            <Text style={bubbleTextStyle}>
              {this.props.text}
            </Text>
          </View>

          {rightSpacer}

          {this.props.direction === 'right' ?
          <Image
            style={{width: 36, height: 36, borderRadius: 18, alignSelf: 'center', marginRight: 16}}
            source={require('../me.jpg')}
          /> : null}

      </View>
      );
  }
}
