import React, { Component } from "react";
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from "native-base";
import { TouchableOpacity } from "react-native";
export default class ListAvatar extends Component {
  render() {
    return (
      //   <TouchableOpacity
      //   onPress={
      //     () => {
      //     console.log(this.props)
      //     // this.props.navigation.navigate('../Screens/ChatMessage')
      //     navigation.navigate('ChatMessage')
      //     }
      //   }
      // >
        <ListItem
          avatar
          button
          onPress={this.props.onOpenChatMessage}
        >
          <Left>
            <Thumbnail
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png"
              }}
            />
          </Left>
          <Body>
            <Text>Weisheng Wu</Text>
            <Text note>Doing what you like will always keep you happy . . .</Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </ListItem>
      // </TouchableOpacity>
    );
  }
}
