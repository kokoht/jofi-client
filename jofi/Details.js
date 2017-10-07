import React from 'react'
import { View, Button, FlatList, AsyncStorage, StyleSheet } from 'react-native'

import { Text, Card } from "react-native-elements";
import axios from 'axios';

class Details extends React.Component {

  constructor(props) {
    super(props);
    var randomId = ''

    this.state = {
      user: ''
    }
  }

  componentDidMount() {
   Promise.resolve(this.getData())
    .then((value) => {
      console.log('the value from promise', value); // "Success"
        randomId = JSON.parse(value)
        console.log('the value of randomId from value', randomId);
        this.setState({
          user: randomId.id
        })
     })
     .catch(error => {
       console.log('error from promise get data()', error)
     })
  }

  async getData(){
    const userId = await AsyncStorage.getItem('userId');
    console.log('user ID', userId)
    return userId
  }

  _setStateAndSend (input) {
    console.log('the input to be send to axios', input);
    axios.post(`https://4e307c98.ngrok.io/chatbot/${this.state.user}`, {
      message: 'Send choosen Job',
      choosenJob: input,
      action: 'send_job'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    console.log('-----------------------');
    console.log('the navigation', this.props.navigation.state);
    const list = this.props.navigation.state.params.details
    return (
      <Card>

          <Card
            containerStyle={
              {backgroundColor: '#e8e8f9'}
            }
            >
          <Text h5 style={styles.textDetail}>{list.title}</Text>
          </Card>

          <Card
            containerStyle={
              {backgroundColor: '#e8e8f9'}
            }
            >
          <Text h5 style={styles.textDetail}>Published at:</Text>
          <Text h5 style={styles.textDetail}>{list.pubDate}</Text>
          </Card>

        <Card
          containerStyle={
            {backgroundColor: '#e8e8f9'}
          }
          >
        <Text h5 style={styles.textDetail}>Requirement:</Text>
              <FlatList
              data={list.category}
              renderItem={({item}) => <Text h6 style={styles.textDetail}>{item}</Text>}
            />
        </Card>

        <Card
          containerStyle={
            {backgroundColor: '#e8e8f9'}
          }
          >
          <Button
            icon={{name: 'code'}}
            fontFamily='Lato'
            onPress={() => this._setStateAndSend(list)}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 50, backgroundColor: '#2D1E46'}}
            title='SEND EMAIL' />
        </Card>


      </Card>
    )
  }

}

const styles = StyleSheet.create({
textDetail: {
  color: 'black'
}

})

export default Details
