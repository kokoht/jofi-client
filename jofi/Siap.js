import React from 'react';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';

import {
  AppRegistry,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';

export default class Siap extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true
    };
  }

  onClose() {
    console.log('Modal just closed');
  }
  onOpen() {
    console.log('Modal just openned');
  }
  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  render() {

    return (
      <View>
        <Button onPress={() => this.refs.modal1.open()} style={styles.btn}>Menu Bar</Button>
        <Modal
          style={styles.modal}
          ref={"modal1"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          position='top'
          onClosingState={this.onClosingState}>
            <Text style={styles.text}>Swipe Here To Close Swipe Here To Close Swipe Here To Close Swipe Here To Close</Text>
          <Button onPress={() => this.refs.modal1.open()} style={styles.btn}>      Modal Out       </Button>
        <Button onPress={() => this.refs.modal1.open()} style={styles.btn}>      Modal Out       </Button>
      <Button onPress={() => this.refs.modal1.open()} style={styles.btn}>      Modal Out       </Button>

        </Modal>


      </View>
    );
  }

}
const { height, width } = Dimensions.get('screen')

const styles = StyleSheet.create({

  wrapper: {
    marginBottom: -10,
    width: 150,
    height: 960,
    alignSelf: 'center'
  },

  modal: {
    height: height/2,
    alignSelf: 'center',
    alignItems: 'center'

  },

  btn: {
    margin: 10,
    backgroundColor: "#9b5d00",
    color: "white",
    padding: 10
  },
  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },


  text: {
    color: "black",
    fontSize: 18
  }

});
