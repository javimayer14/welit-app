import React from "react";
import { Icon } from "react-native-elements";

import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { StoriesScreenStacks } from "./StoriesStacks";
import SearchScreenStacks from "./SearchStack";
import AccountScreenStacks from "./AccountStack";

const NavigationStacks = createBottomTabNavigator(
  {
    Stories: {
      screen: StoriesScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Historias",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="book-open-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Search: {
      screen: SearchScreenStacks,
      navigationOptions: () => ({
        tabBarLabel: "Search",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="magnify"
            size={22}
            color={tintColor}
          />
        )
      })
    },
    Account: {
      screen: AccountScreenStacks,
      navigationOptions: () => ({
      
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account-outline"
            size={22}
            color={tintColor}
          />
        )
      })
    }
  },
  
  {
    initialRouteName: "Stories",
    order: ["Stories", "Search", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
);

export default createAppContainer(NavigationStacks);
