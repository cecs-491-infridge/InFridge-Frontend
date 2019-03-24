import React from 'react';
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native';
// import { SearchBar } from 'react-native-elements';
import { Body, Button, Container, Header, Item, Input, Icon, Left, Separator, Right, Text, Title } from 'native-base';

import PostForm from '../components/PostForm';
import Food from '../components/Food';
import { startAddFood, startDeleteFood } from '../actions/fridge';
import { filterFood, sortFood } from '../selectors/food'

class FridgeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fridge: this.props.fridge,
      search: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.fridge !== this.state.fridge) {
      this.setState({ fridge: nextProps.fridge });
    }
  }

  updateSearch = search => {
    // Change to use timeout
    let fridge = filterFood(this.props.fridge, search);

    this.setState(prevState => ({
      fridge,
      search
    }));
  };

  render() {
    const { search } = this.state;

    return (
      <Container>

        <Header>
          <Left />
          <Body>
            <Title>Feed</Title>
          </Body>
          <Right />
        </Header>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search Fridge..."
            onChangeText={this.updateSearch}
            value={search} />
          <Right>
            <Button iconLeft light rounded>
              <Text>Search</Text>
            </Button>
          </Right>

        </Item>
        <ScrollView>
          <Separator boarderd>
            <Text>Public</Text>

          </Separator>          
          {
            this.state.fridge.map(food =>

              <Food
                key={food._id}
                food={food}
                onDelete={id => this.props.dispatch(startDeleteFood(id))}
              />
            )
          }
          <Separator boarderd>
            <Text>Partial Public</Text>
          </Separator>
          <Separator boarderd>
            <Text>Private</Text>
          </Separator>

        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  }
});

const mapStateToProps = (state) => ({
  fridge: sortFood(state.fridge, state.sortBy.fridge)
});

export default connect(mapStateToProps)(FridgeScreen)