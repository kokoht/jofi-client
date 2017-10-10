import React from 'react'
import { View, Text, Button, FlatList, ScrollView } from 'react-native'

import { List, ListItem, Icon} from "react-native-elements";

class ListDemo extends React.Component {

  render() {
    // console.log('-----------------------');
    // console.log('the navigation', this.props.navigation.state);
    const list = this.props.navigation.state.params.jobs
    return (
      <ScrollView>
        <List>
          {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              key={i}
              title={l.title}
              subtitle={l.location}
              onPress={() => this.props.navigation.navigate('Details', { details: l })}
            />
          ))
        }
        </List>
       </ScrollView>
    )
  }

}

export default ListDemo
