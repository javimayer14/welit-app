import React from "react";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import AccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";
import SettingsScreen  from "../screens/Account/Settings";
import { Button } from "react-native";
import { Icon } from "react-native-elements";


const AccountScreenStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation, route }) => ({
      headerRight: (
        <Icon
          type="material-community"
          name="cogs"
          color="#00a680"
          size={40}
          iconStyle={{marginRight:10}}
           onPress={() => navigation.navigate("Settings")}
        />
      ),
    }),   
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      title: "Login",
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro",
    }),
  },
  Settings:{
    screen: SettingsScreen,
    navigationOptions: () => ({
      title: "Settings",
    }),
  }
});

export default AccountScreenStack;
