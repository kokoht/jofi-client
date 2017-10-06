import React from 'react'
import { View, Button, FlatList } from 'react-native'

import { Text } from "react-native-elements";

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
    return (
      <View>
        <Text h1>{list['a10:author']['a10:name']}</Text>
        <Text h2>{list["a10:updated"]}</Text>
        <Text h3>{list.location}</Text>
        <Text>{list.pubDate}</Text>
          <FlatList
            data={list.category}
            renderItem={({item}) => <Text h4>{item}</Text>}
          />
      </View>
    )
  }

}


// <FlatList
//   data={[{key: 'a'}, {key: 'b'}]}
//   renderItem={({item}) => <Text>{item.key}</Text>}
// />
//   <Text><h1>{list['a10:author']['a10:name']}</h1></Text>
// <Text><h1>{list.location}</h1></Text>
// <Text>{list.pubDate}</Text>
export default Details
