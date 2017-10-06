import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, ScrollView, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard } from 'react-native';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import * as firebase from 'firebase';
import axios from 'axios';
const uuidv1 = require('uuid/v1');

var firebaseConfig = {
  databaseURL: 'https://ada-firebase.firebaseio.com',
 projectId: 'ada-firebase'
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
// The actual chat view itself- a ScrollView of BubbleMessages, with an InputBar at the bottom, which moves with the keyboard
export default class ChatView extends Component {

  constructor(props) {
    super(props);
    var randomId = ''

    this.state = {
      messages: [],
      inputBarText: '',
      user: ''
    }
  }

  async getData(){
    const userId = await AsyncStorage.getItem('userId');
    console.log('user ID', userId)
    return userId
  }

  getRef() {
   return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      console.log('this is snap', snap)
      snap.forEach((child) => {
        var directionInput = ''
        if (child.val().from == 'jofi') {
          directionInput = 'left'
        } else {
          this.setState({
            user: child.val().from
          })
          directionInput = 'right'
        }
        items.push({
          from: child.val().from,
          text: child.val().message.text,
          key: child.key,
          direction: directionInput
        });
      });
      console.log('this is items', items)
      this.setState({
        messages: items
      });

    });
  }


  static navigationOptions = {
    title: 'Chat',
  };

  //fun keyboard stuff- we use these to get the end of the ScrollView to "follow" the top of the InputBar as the keyboard rises and falls
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //When the keyboard appears, this gets the ScrollView to move the end back "up" so the last message is visible with the keyboard up
  //Without this, whatever message is the keyboard's height from the bottom will look like the last message.
  keyboardDidShow (e) {
    this.scrollView.scrollToEnd();
  }

  //When the keyboard dissapears, this gets the ScrollView to move the last message back down.
  keyboardDidHide (e) {
    this.scrollView.scrollToEnd();
  }

  //scroll to bottom when first showing the view
  componentDidMount() {
   Promise.resolve(this.getData())
    .then((value) => {
      console.log('the value from promise', value); // "Success"
      if (value !== null) {
        randomId = JSON.parse(value)
        console.log('the value of randomId from value', randomId);
        this.setState({
          user: randomId.id
        });
        // var userFirebaseChild = JSON.parse(this.state.user).id
        var userFirebaseChild = this.state.user
        console.log('userFirebaseChild is', userFirebaseChild)
        this.itemsRef = this.getRef().child('jofi/'+userFirebaseChild);
        this.listenForItems(this.itemsRef);
      } else {
        console.log('NULL brah');
        randomId = {id: uuidv1()}
        this.setState({
          user: randomId.id
        });
        var userFirebaseChild = this.state.user
        console.log('userFirebaseChild is', userFirebaseChild)
        this.itemsRef = this.getRef().child('jofi/'+userFirebaseChild);
        this.listenForItems(randomId.id);
      }
    })
    console.log('test the state', this.state)
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }

  //this is a bit sloppy: this is to make sure it scrolls to the bottom when a message is added, but
  //the component could update for other reasons, for which we wouldn't want it to scroll to the bottom.
  componentDidUpdate() {
    setTimeout(function() {
      this.scrollView.scrollToEnd();
    }.bind(this))
  }
  // Decide bubbble to left or right
  _sendMessage() {
    // this.state.messages.push({direction: "right", text: this.state.inputBarText});
    console.log('for the axios', this.state.user)
    axios.post(`https://4e307c98.ngrok.io/chatbot/${this.state.user}`, {
      message: this.state.inputBarText
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    AsyncStorage.getItem('userId', (err, result) => {
      console.log('the result from async abis send', result);
    });
    // this.itemsRef.push({from: this.state.user, message: this.state.inputBarText})
    this.listenForItems(this.itemsRef)
    this.setState({
      inputBarText: ''
    });
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  //This event fires way too often.
  //We need to move the last message up if the input bar expands due to the user's new message exceeding the height of the box.
  //We really only need to do anything when the height of the InputBar changes, but AutogrowInput can't tell us that.
  //The real solution here is probably a fork of AutogrowInput that can provide this information.
  // _onInputSizeChange() {
  //   setTimeout(function() {
  //     this.scrollView.scrollToEnd({animated: false});
  //   }.bind(this))
  // }
  // onSizeChange={() => this._onInputSizeChange()}
  render() {
    var messages = [];

    this.state.messages.forEach(function(message, index) {
      messages.push(
          <MessageBubble key={index} direction={message.direction} text={message.text}/>
        );
    });

    // return (
    //           <View style={styles.outer}>
    //               <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
    //                 {messages}
    //               </ScrollView>
    //               <InputBar onSendPressed={() => this._sendMessage()}
    //                         // onSizeChange={() => this._onInputSizeChange()}
    //                         onChangeText={(text) => this._onChangeInputBarText(text)}
    //                         text={this.state.inputBarText}/>
    //               <KeyboardSpacer/>
    //           </View>
    //         );

    return (
              <View style={styles.outer}>
                  <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
                    {messages}
                  </ScrollView>
                  <InputBar onSendPressed={() => this._sendMessage()}
                            onChangeText={(text) => this._onChangeInputBarText(text)}
                            text={this.state.inputBarText}/>
              </View>
            );
  }
}

//The bubbles that appear on the left or the right for the messages.
class MessageBubble extends Component {
  render() {
    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 70}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 70}}/> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeft] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;

    return (
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            {leftSpacer}
            <View style={bubbleStyles}>
              <Text style={bubbleTextStyle}>
                {this.props.text}
              </Text>
            </View>
            {rightSpacer}
          </View>
      );
  }
}

//The bar at the bottom with a textbox and a send button.
class InputBar extends Component {

  //AutogrowInput doesn't change its size when the text is changed from the outside.
  //Thus, when text is reset to zero, we'll call it's reset function which will take it back to the original size.
  //Another possible solution here would be if InputBar kept the text as state and only reported it when the Send button
  //was pressed. Then, resetInputText() could be called when the Send button is pressed. However, this limits the ability
  //of the InputBar's text to be set from the outside.
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
                      defaultHeight={30}
                      onChangeText={(text) => this.props.onChangeText(text)}
                      onContentSizeChange={this.props.onSizeChange}
                      value={this.props.text}/>
            <TouchableHighlight style={styles.sendButton} onPress={() => this.props.onSendPressed()}>
                <Text style={{color: 'white'}}>Send</Text>
            </TouchableHighlight>
          </View>
          );
  }
}

//TODO: separate these out. This is what happens when you're in a hurry!
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
  },

  textBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
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
    backgroundColor: '#66db30'
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

  messageBubbleTextLeft: {
    color: 'black'
  },

  messageBubbleRight: {
    backgroundColor: '#66db30'
  },

  messageBubbleTextRight: {
    color: 'white'
  },
})
