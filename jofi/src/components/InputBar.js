import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Alert, Text, View, FlatList, StyleSheet, AsyncStorage, Image, ScrollView, Button, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard,  Dimensions} from 'react-native';
import AutogrowInput from 'react-native-autogrow-input';
import styles from '../styles'
export default class InputBar extends Component {

  componentWillReceiveProps(nextProps) {
    if(nextProps.text === '') {
      this.autogrowInput.resetInputText();
    }
  }

  render() {
    return (
          <View style={styles.inputBar}>
          <AutogrowInput style={styles.textBox}
                      ref={(ref) => { this.autogrowInput = ref }}
                      multiline={true}
                      defaultHeight={40}
                      onChangeText={(text) => this.props.onChangeText(text)}
                      onContentSizeChange={this.props.onSizeChange}
                      value={this.props.text}/>
                    <TouchableHighlight style={styles.sendButton} underlayColor='white' onPress={() => this.props.onSendPressed()}>
                <Icon name="send" size={26} color="black"/>
            </TouchableHighlight>
          </View>
          );
  }
}
