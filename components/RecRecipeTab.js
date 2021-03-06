import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Item, Icon, Input, Button, Text } from 'native-base';
export default class RecRecipeTab extends Component {


  


  
  render() {
    return (



      <Container>

            <Header searchBar rounded>
              <Item>
                <Icon name="ios-search" />
                <Input 
                  placeholder="Search Recipes..."
                  //onChangeText={this.updateSearch}
                  //value={search}
                  />
                <Icon name="ios-people" />
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>
        
        <Content>
          <List>
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}