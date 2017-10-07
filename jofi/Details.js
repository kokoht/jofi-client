import React from 'react'
import { View, Button, FlatList, StyleSheet } from 'react-native'

import { Text, Card } from "react-native-elements";

// this is the place...

// <Button
//   title="Open chat"
//   onPress={() => props.navigation.navigate('Main')}
//   />

// <FlatList
//   data={this.props.navigation.state.params.jobs}
//   renderItem={({ item }) => (
//     <ListItem
//       title={item.title}
//       subtitle={item.title}
//     />
//   )}
// />
class Details extends React.Component {

  render() {
    console.log('-----------------------');
    console.log('the navigation', this.props.navigation.state);
    const list = this.props.navigation.state.params.details
    // <Text h2>{list["a10:updated"]}</Text>
    // <Text h3>{list.description}</Text>
    // <Text h5>{list.location}</Text>


    // <Text h1>{list['a10:author']['a10:name']}</Text>

    // link:
    // <Text h5>{list.link}</Text>

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


        <Button
          icon={{name: 'code'}}
          fontFamily='Lato'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop: 50, backgroundColor: '#2D1E46'}}
          title='SEND EMAIL' />

      </Card>
    )
  }

}

const styles = StyleSheet.create({
textDetail: {
  color: 'black'
}

})


// <FlatList
//   data={[{key: 'a'}, {key: 'b'}]}
//   renderItem={({item}) => <Text>{item.key}</Text>}
// />
//   <Text><h1>{list['a10:author']['a10:name']}</h1></Text>
// <Text><h1>{list.location}</h1></Text>
// <Text>{list.pubDate}</Text>
export default Details
