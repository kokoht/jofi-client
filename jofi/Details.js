import React from 'react'
import { View, Button, FlatList, StyleSheet } from 'react-native'

import { Text, Card } from "react-native-elements";

class Details extends React.Component {

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
