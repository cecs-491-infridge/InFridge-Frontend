import React from 'react';
import { Icon } from 'native-base';

import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import SignUpScreen from '../Screens/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen';
import HomeScreen from '../Screens/HomeScreen';
import FeedScreen from '../Screens/FeedScreen';
import MessageScreen from '../Screens/MessageScreen';
import FridgeScreen from '../Screens/FridgeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import RecipeScreen from '../Screens/RecipeScreen';
import ChatScreen from '../Screens/ChatScreen';
import SpecificRecipeScreen from '../Screens/SpecificRecipeScreen';
import TestScreen from '../Screens/TestScreen';

import FeedRouter from '../routers/FeedRouter';

const AppNavigator = createMaterialBottomTabNavigator({
    //export default createMaterialBottomTabNavigator({
    //SignIn: { screen: SignInScreen },
    Feed: {
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            // type="MaterialCommunityIcons"
            name="home"
            size={24}
          />
        )
      }),
      screen: FeedRouter,
      gesturesEnabled: false,
    },
    Fridge: {
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="fridge"
            size={24}
          />
        )
      }),
      screen: FridgeScreen
    },
    Message: {
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="message"
            size={24}
          />
        )
      }),
      screen: MessageScreen
    },
    Profile: {
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="MaterialCommunityIcons"
            name="account"
            size={24}
          />
        )
      }),
      screen: ProfileScreen
    },
  }, {
    tabBarOptions:{
      activeTintColor: '#F8F8F8', // active icon color
      inactiveTintColor: '#586589',  // inactive icon color
      style: {
          backgroundColor: '#171F33' // TabBar background
      }
    },
      initialRouteName: 'Feed',
      activeColor: '#3498db',
      inactiveColor: '#34495e',
      barStyle: { backgroundColor: '#f0edf6' },
      shifting: false
    });
  
export default createAppContainer(AppNavigator);