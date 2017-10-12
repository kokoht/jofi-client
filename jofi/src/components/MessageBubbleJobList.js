import React, { Component } from 'react';
import { Alert, Text, View, FlatList, StyleSheet, AsyncStorage, Image, ScrollView, Button, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard,  Dimensions} from 'react-native';
import styles from '../styles'

export default class MessageBubbleJobList extends Component {
  render() {
    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 70}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 70}}/> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeftList] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;
    // console.log('-----------wawaw', this.props);
    return (
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <Image
          style={{width: 36, height: 36, borderRadius: 18, alignSelf: 'center', marginLeft: 16}}
          source={require('../jofi.jpg')}
        />
          {leftSpacer}

          <View style={bubbleStyles}>
            <Button
              color="#8f77b7"
              onPress={() => this.props.navigate('List', { jobs: this.props.listJobs })}
              title='Berikut daftar pekerjaan yang kamu inginkan'
            />
          </View>

          {rightSpacer}
      </View>
      );
  }
}
