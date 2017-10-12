import React, { Component } from 'react';
import { Alert, Text, View, FlatList, StyleSheet, AsyncStorage, Image, ScrollView, Button, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard,  Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import MenuButton from 'react-native-button';
import Modal from 'react-native-modalbox';
import AutogrowInput from 'react-native-autogrow-input';

import styles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';

import MessageBubble from '../components/MessageBubble'
import MessageBubbleJobList from '../components/MessageBubbleJobList'
import InputBar from '../components/InputBar'

import * as firebase from 'firebase';
import axios from 'axios';
const uuidv1 = require('uuid/v1');

// firebase access
var firebaseConfig = {
  databaseURL: 'https://ada-firebase.firebaseio.com',
  projectId: 'ada-firebase'
}
const firebaseApp = firebase.initializeApp(firebaseConfig);

// server access
const urlServer = 'http://jofi-server-dev.ap-southeast-1.elasticbeanstalk.com/chatbot'

export default class ChatView extends Component {

  constructor(props) {
    super(props);
    var randomId = ''

    this.state = {
      messages: [],
      inputBarText: '',
      user: '',
      latitude: null,
      longitude: null,
      error: null,

      isOpen: false,
      isDisabled: false,
      swipeToClose: true
    }
  }

  // react-navigation
  static navigationOptions = {
    title: 'Jofi',
    headerStyle: { height: 35 },
  };

  // listen for firebase data

  async getData(){
    const userId = await AsyncStorage.getItem('userId');
    return userId
  }

  getRef() {
   return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    var items = [...this.state.messages]

    itemsRef.on('child_added', (snap) => {
      var directionInput = ''

      if (snap.val().from == 'jofi') {
        directionInput = 'left'
      } else {
        directionInput = 'right'
      }

      if (typeof snap.val().message.action !== 'undefined') {
        if (snap.val().message.action.type == 'clear_history') {
          items = []
          items.push({
            from: snap.val().from,
            text: snap.val().message.text,
            wholeMessage: snap.val().message,
            key: snap.key,
            direction: directionInput
          });
          this.setState({
            messages: items
          });
        } else {
          items.push({
            from: snap.val().from,
            text: snap.val().message.text,
            wholeMessage: snap.val().message,
            key: snap.key,
            direction: directionInput
          });
          this.setState({
            messages: items
          });
        }
      } else {
        items.push({
          from: snap.val().from,
          text: snap.val().message.text,
          wholeMessage: snap.val().message,
          key: snap.key,
          direction: directionInput
        });
        this.setState({
          messages: items
        });
      }
    });
  }

  // For keyboard and inputbar to follow to the end of the ScrollView
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //make sure the messages on top of the keyboard and input bar when its up are the latest ones
  keyboardDidShow (e) {
    this.scrollView.scrollToEnd();
  }

  keyboardDidHide (e) {
    this.scrollView.scrollToEnd();
  }

  componentDidMount() {
    // check whether the userId already exists in async storage of the mobile
   Promise.resolve(this.getData())
    .then((value) => {
      if (value !== null) {
        // if there is already existing id
        randomId = JSON.parse(value)
        this.setState({
          user: randomId.id
        });
        var userFirebaseChild = this.state.user
        this.itemsRef = this.getRef().child('jofi/'+userFirebaseChild);
        this.listenForItems(this.itemsRef);
        } else {
         randomId = {id: uuidv1()}
         this.setState({
           user: randomId.id
         });
         var userFirebaseChild = this.state.user
         this.itemsRef = this.getRef().child('jofi/'+userFirebaseChild);
         // if there's no userid yet, then we need to set a new random id
         AsyncStorage.setItem('userId', JSON.stringify(randomId), (err, result) => {
         });
         this.listenForItems(randomId.id);
       }
     })
     .catch(error => {
       // console.log(error)
     })

  }

  _sendMessage() {
    if (this.state.inputBarText !== '') {
      axios.post(`${urlServer}/${this.state.user}`, {
        message: this.state.inputBarText
      })
      .then(function (response) {
        // console.log(response);
      })
      .catch(function (error) {
        // console.log(error);
      });
      this.setState({
        inputBarText: ''
      });
    }
  }

  _setStateAndSend (input) {
    axios.post(`${urlServer}/${this.state.user}`, {
      message: input
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
    this.refs.modal1.close()
  }

  _sendLocation (input) {
    navigator.geolocation.getCurrentPosition(
     (position) => {
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         error: null,
       });

       axios.post(`${urlServer}/${this.state.user}`, {
         action: 'get_job_by_location',
         message: input,
         location: {
           latitude: this.state.latitude,
           longitude: this.state.longitude,
           error: this.state.error
         }
       })
       .then(function (response) {
        //  console.log('ini response yang ok -------------', response);
       })
       .catch(function (err) {
        //  console.log('ini response yang err -------------',err);
       });
     },
     (error) => {
       this.setState({ error: error.message })
       Alert.alert(
        'Opps! Sorry master..',
        'Jofi tidak dapat mendapatkan koordinasi lokasi anda dengan cepat. Coba lagi dong..'
       )
     },
     { enableHighAccuracy: false, timeout: 30000, maximumAge: 1000 },
   );
    this.refs.modal1.close()
  }

  _onChangeInputBarText(text) {
    this.setState({
      inputBarText: text
    });
  }

  render() {
    var messages = [];
    const { navigate } = this.props.navigation
    this.state.messages.forEach(function(message, index) {
      if (typeof message.wholeMessage.job !== 'undefined') {
        messages.push(
          <MessageBubbleJobList navigate={navigate} key={index} direction={message.direction} text={message.text} listJobs={message.wholeMessage.job}/>
        );

      } else {
        messages.push(
          <MessageBubble key={index} direction={message.direction} text={message.text}/>
        );
      }
    });
    SplashScreen.hide();
    return (
      <View style={styles.outer}>

        <ScrollView
            ref={ref => this.scrollView = ref}
            style={styles.messages}
            onContentSizeChange={(contentWidth, contentHeight)=>{
                this.scrollView.scrollToEnd({animated: true});
            }}>

            {messages}
        </ScrollView>

        <MenuButton onPress={() => this.refs.modal1.open()} style={styles.btnModal}>
          <Icon name="chevron-up" size={30} color="black" style={{alignSelf: 'center'}}/>
        </MenuButton>

        <Modal
          style={styles.modal}
          ref={"modal1"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          position='top'
          onClosingState={this.onClosingState}>
            <Icon name="chevron-down" size={40} color="black" style={styles.textModal} onPress={() => this.refs.modal1.close()}/>
              <MenuButton onPress={() => this._sendLocation('send location')} style={styles.btnInsideModal}>     Find nearest jobs  </MenuButton>
              <MenuButton onPress={() => this._setStateAndSend('mau cari kerja di kota')} style={styles.btnInsideModal}>     Find jobs based on location     </MenuButton>
              <MenuButton onPress={() => this._setStateAndSend('mau cari kerja sesuai bidang')} style={styles.btnInsideModal}>      Find jobs based on specialisation       </MenuButton>
              <MenuButton onPress={() => this._setStateAndSend('saya lagi nganggur nih jof')} style={styles.btnInsideModal}>      No jobs yet    </MenuButton>
              <MenuButton onPress={() => this._setStateAndSend('kamu siapa')} style={styles.btnInsideModal}>      Who is Jofi     </MenuButton>
              <MenuButton onPress={() => this._setStateAndSend('apa yang kamu bisa lakukan')} style={styles.btnInsideModal}>      Jofi's skills     </MenuButton>
              <MenuButton onPress={() => this._setStateAndSend('tutorial menggunakan kamu')} style={styles.btnInsideModal}>      How to use Jofi      </MenuButton>
              <MenuButton onPress={() => this._setStateAndSend('clear history')} style={styles.btnInsideModal}>      Clear history      </MenuButton>
        </Modal>
          <InputBar onSendPressed={() => this._sendMessage()}
                    onChangeText={(text) => this._onChangeInputBarText(text)}
                    text={this.state.inputBarText}/>
      </View>
    );
  }
}
