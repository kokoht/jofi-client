import React from 'react'
import { View, FlatList, AsyncStorage, TouchableHighlight, StyleSheet, Button, Text, ScrollView, Linking, Share} from 'react-native'
import { NavigationActions} from 'react-navigation'
import { Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from '../styles';
const urlServer = 'http://jofi-server-dev.ap-southeast-1.elasticbeanstalk.com/chatbot'

// if you want to reset not navigate, but has problem with "cannot mount setState something that is unmounted"
// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'Main'})
//   ]
// })

const resetAction = NavigationActions.navigate({ routeName: 'Main'})

class Details extends React.Component {

  constructor(props) {
    super(props);
    var randomId = ''

    this.state = {
      user: ''
    }
  }

  static navigationOptions = {
    headerStyle: { height: 35 },
  };

  onShare(input) {
    console.log('this is the share', input)
    let message = ''
    if (input.link) {
      message = `${input.title} (check it at ${input.link}). With <3 by Jofi.`
    } else {
      message = `${input.title} at ${input.location}. With <3 by Jofi.`
    }
    Share.share({
      message: message,
      url: undefined,
      title: `${input.title}`
    }, {
      // Android only:
      dialogTitle: 'Share your choosen job',
      // iOS only:
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })

  }

  componentDidMount() {
   Promise.resolve(this.getData())
    .then((value) => {
        randomId = JSON.parse(value)
        this.setState({
          user: randomId.id
        })
     })
     .catch(error => {
      //  console.log('error from promise get data()', error)
     })
  }

  async getData(){
    const userId = await AsyncStorage.getItem('userId');
    // console.log('user ID', userId)
    return userId
  }

  _setStateAndSend (input) {
    axios.post(`${urlServer}/${this.state.user}`, {
      message: 'job_choosen',
      choosenJob: input,
      action: 'send_job'
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    const list = this.props.navigation.state.params.details
    return (
      <ScrollView>
      <Card containerStyle={
        {borderRadius: 5}
      }>

          <Card
            containerStyle={
              {backgroundColor: '#e8e8f9'}
            }
            >
          <Text style={styles.title}>{list.title}</Text>
          {(list.link) ? <Icon name="info-circle" size={15} alignSelf="center" color="black" onPress={() => Linking.openURL(list.link)}/>: null}

          </Card>

          <Card
            containerStyle={
              {backgroundColor: '#2D1E46'}
            }
            >
            <Text style={styles.details}>Located at {list.location}</Text>
            {typeof list.pubDate !== 'undefined' ? <Text style={styles.details}>Published on {list.pubDate.replace("Z", "")}</Text> : null}
          </Card>


        {(list.category && list.category.length > 0) ?
        <Card
          containerStyle={
            {backgroundColor: '#8f77b7'}
          }
          >

        <Text style={styles.textDetailTitle}>Requirement:</Text>
              <FlatList
              data={list.category.map((item, index) => ({text: item, key: index}))}
              renderItem={({item}) => <Text key={item.key} style={styles.textDetail}>{item.text}</Text>}
            />
        </Card> : null}

        <Card
          containerStyle={
            {backgroundColor: 'white', borderColor: 'white', borderWidth: 0, margin: 0}
          }
          >
          <TouchableHighlight underlayColor='white' onPress={() => this._setStateAndSend(list)}>
            <View style={styles.shareButton}>
               <Icon name="send" size={12} color="white"/>
               <Text style={styles.shareButtonText}> Send to email </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor='white' onPress={() => this.onShare(list)}>
            <View style={styles.shareButton}>
               <Icon name="share-alt" size={12} color="white"/>
               <Text style={styles.shareButtonText}> Share </Text>
            </View>
          </TouchableHighlight>
        </Card>

      </Card>
      </ScrollView>
    )
  }
}

export default Details
