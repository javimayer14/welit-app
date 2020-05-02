import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import StoriesScreen from "../screens/Stories";
import AddStorySceen from "../screens/Stories/AddStory";
import AddComentScreen from "../screens/Coments/AddComent";
import UserVisitedScreen from "../screens/UserVisited";
import CountDown from 'react-native-countdown-component';

import story from "../screens/Stories/Story";

export const StoriesScreenStacks = createStackNavigator({
  Stories: {
    screen: StoriesScreen,
    navigationOptions: () => ({
      
      header:(
        <View >
         
        </View>
      )
    })
  },
  AddStory: {
    screen: AddStorySceen,
    navigationOptions: () => ({
      title: "Nueva Story"
    })
  },
  Story:{
    screen: story,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.titulo
    })
  },
  UserVisited: {
    screen: UserVisitedScreen,
    navigationOptions: () => {
      title: "userVisited";
    },
  },
  AddComent:{
    screen: AddComentScreen,
    navigationOptions: () => ({
    })
  }
}

);

export default StoriesScreenStacks;


