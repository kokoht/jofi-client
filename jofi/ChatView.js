import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, AsyncStorage, Image, ScrollView, Button, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard,  Dimensions} from 'react-native';
import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Left, Body, Icon } from 'native-base';
// import KeyboardSpacer from 'react-native-keyboard-spacer';
import AutogrowInput from 'react-native-autogrow-input';
import * as firebase from 'firebase';
import axios from 'axios';
const uuidv1 = require('uuid/v1');


import MenuButton from 'react-native-button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';



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
      user: '',

      isOpen: false,
     isDisabled: false,
     swipeToClose: true


    }
  }

//function modalbox / menu
  onClose() {
        console.log('Modal just closed');
      }
      onOpen() {
        console.log('Modal just openned');
      }
      onClosingState(state) {
        console.log('the open/close of the swipeToClose just changed');
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
    console.log('e masuk listenForItems')
    var items = [...this.state.messages]
    console.log('just make sure the firebase correct', items);
    itemsRef.on('child_added', (snap) => {

      // get children as an array

      console.log('this is snap', snap)
      var directionInput = ''
      // console.log('this is the child', child)
      // console.log('this is the childs value', child.val())
      if (snap.val().from == 'jofi') {
        directionInput = 'left'
      } else {
        // this.setState({
        //   user: snap.val().from
        // })
        directionInput = 'right'
      }
      items.push({
        from: snap.val().from,
        text: snap.val().message.text,
        wholeMessage: snap.val().message,
        key: snap.key,
        direction: directionInput
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

        AsyncStorage.setItem('userId', randomId.id, (err, result) => {
          console.log('make sure setItem asyn bener', result);
        });
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
  //yoyo
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
    this.listenForItems(this.itemsRef)
    this.setState({
      inputBarText: ''
    });
  }

  _setStateAndSend (input) {
    axios.post(`https://4e307c98.ngrok.io/chatbot/${this.state.user}`, {
      message: input
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.listenForItems(this.itemsRef)
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
    const { navigate } = this.props.navigation
    console.log('------------------------ooo', navigate);
    // console.log('this state messages', this.state.messages);
    this.state.messages.forEach(function(message, index) {
      if (typeof message.wholeMessage.job !== 'undefined') {
        // console.log('this is the job------------', message.wholeMessage.job[0].title)
        messages.push(
          <MessageBubbleCarousel navigate={navigate} key={index} direction={message.direction} text={message.text} listJobs={message.wholeMessage.job}/>
        );

      } else {
        messages.push(
          <MessageBubble key={index} direction={message.direction} text={message.text}/>
        );
      }
    });

    console.log('this is it brah', messages);
    console.log('this is it the message', this.state.messages);

    return (
              <View style={styles.outer}>
                  <ScrollView ref={(ref) => { this.scrollView = ref }} style={styles.messages}>
                    {messages}
                  </ScrollView>
                  <MenuButton onPress={() => this.refs.modal1.open()} style={styles.btnModal}>Menu Bar</MenuButton>
                  <Modal
                    style={styles.modal}
                    ref={"modal1"}
                    swipeToClose={this.state.swipeToClose}
                    onClosed={this.onClose}
                    onOpened={this.onOpen}
                    position='top'
                    onClosingState={this.onClosingState}>
                      <Text style={styles.textModal}>Swipe Down To Close </Text>
                    <MenuButton onPress={() => this._setStateAndSend('mau cari kerja di kota')} style={styles.btnInsideModal}>     Find job by location      </MenuButton>
                  <MenuButton onPress={() => this._setStateAndSend('mau cari kerja sesuai bidang')} style={styles.btnInsideModal}>      Find job by specialisation       </MenuButton>
                  <MenuButton onPress={() => this._setStateAndSend('clear history')} style={styles.btnInsideModal}>      Clear history       </MenuButton>

                  </Modal>
                  <InputBar onSendPressed={() => this._sendMessage()}
                            onChangeText={(text) => this._onChangeInputBarText(text)}
                            text={this.state.inputBarText}/>
              </View>
            );
  }
}

class MessageBubbleCarousel extends Component {
  render() {
    //These spacers make the message bubble stay to the left or the right, depending on who is speaking, even if the message is multiple lines.
    var leftSpacer = this.props.direction === 'left' ? null : <View style={{width: 70}}/>;
    var rightSpacer = this.props.direction === 'left' ? <View style={{width: 70}}/> : null;

    var bubbleStyles = this.props.direction === 'left' ? [styles.messageBubble, styles.messageBubbleLeftList] : [styles.messageBubble, styles.messageBubbleRight];

    var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;
    console.log('-----------wawaw', this.props);
    return (
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Image
            style={{width: 36, height: 36, borderRadius: 18, alignSelf: 'center'}}
            source={require('./jofi.jpg')}
          />
            {leftSpacer}
            <View style={bubbleStyles}>
              <Button
                color="#8f77b7"
                onPress={() => this.props.navigate('List', { jobs: this.props.listJobs})}
                title='Berikut daftar pekerjaan yang kamu inginkan'
              />
            </View>
            {rightSpacer}
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
          {this.props.direction === 'left' ?
            <Image
              style={{width: 36, height: 36, borderRadius: 18, alignSelf: 'center'}}
              source={require('./jofi.jpg')}
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
                style={{width: 36, height: 36, borderRadius: 18, alignSelf: 'center'}}
                source={require('./me.jpg')}
              /> : null}
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
                      defaultHeight={40}
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



  btnModal: {
    margin: 10,
    backgroundColor: "black",
    color: "white",
    padding: 10
  },
  btnInsideModal: {
    margin: 10,
    backgroundColor: "#bef2b3",
    color: "white",
    padding: 10
  },


  textModal: {
    color: "black",
    fontSize: 22,
    padding: 10,
    alignSelf: 'center'
  }




})
