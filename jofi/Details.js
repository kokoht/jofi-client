import React from 'react'
import { View, FlatList, AsyncStorage, StyleSheet, Button, Text, ScrollView, Linking} from 'react-native'
import { NavigationActions} from 'react-navigation'
import { Card } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const urlServer = 'http://d1a1b7eb.ngrok.io/chatbot'

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

  componentDidMount() {
   Promise.resolve(this.getData())
    .then((value) => {
      // console.log('the value from promise', value); // "Success"
        randomId = JSON.parse(value)
        // console.log('the value of randomId from value', randomId);
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
    // console.log('the input to be send to axios', input);
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
    // console.log('-----------------------');
    // console.log('the navigation', this.props.navigation.state);
    const list = this.props.navigation.state.params.details
    const firstFiltered = list.description.replace(/&lt;|p&gt|a&gt|&gt|br|li|ul|ul;|;/gi, "")
    var lastFiltered = firstFiltered.replace(/\//g, "");
    return (
      <ScrollView>
      <Card>

          <Card
            containerStyle={
              {backgroundColor: '#e8e8f9'}
            }
            >
          <Text style={styles.title}>{list.title}</Text>
          <Icon name="info-circle" size={15} alignSelf="flex-end" color="black" onPress={() => Linking.openURL(list.link)}/>
          </Card>

          <Card
            containerStyle={
              {backgroundColor: '#2D1E46'}
            }
            >
            <Text style={styles.details}>Located at {list.location}</Text>
            <Text style={styles.details}>Published on {list.pubDate.replace("Z", "")}</Text>
          </Card>

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
        </Card>

        <Card
          containerStyle={
            {backgroundColor: '#e8e8f9'}
          }
          >
          <Button
            fontFamily='Lato'
            onPress={() => this._setStateAndSend(list)}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 50, backgroundColor: '#6ED6C1'}}
            title='SEND EMAIL' />
        </Card>

      </Card>
      </ScrollView>

    )
  }

}

const styles = StyleSheet.create({
textDetail: {
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 10,
  textAlign: 'left'
},
textDetailTitle: {
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 12,
  textAlign: 'center'
},
title: {
  color: 'black',
  fontFamily: 'Roboto',
  fontSize: 20,
  textAlign: 'center'
},
details:{
  color: 'white',
  fontFamily: 'Roboto',
  fontSize: 12,
  textAlign: 'center'
}

})

export default Details

//

// <Card
//   containerStyle={
//     {backgroundColor: '#e8e8f9'}
//   }
//   >
//   <Text style={{color: 'blue'}}
//         onPress={() => Linking.openURL(list.link)}>
//     See the job source
//   </Text>
// </Card>
//
// <Card
//   containerStyle={
//     {backgroundColor: '#2D1E46'}
//   }
//   >
//
//   <Text style={styles.details}>Rough Description:</Text>
//   <Text style={styles.details}>{lastFiltered}</Text>
// </Card>
