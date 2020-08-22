import React from "react";
import { View, StyleSheet, Text } from "react-native";
import UserScores from "../components/Account/UserScores";
import { Avatar } from "react-native-elements";

export default function UserVisited(props) {
  const { navigation } = props;
  const { email, nombre, apellido, score, photoURL } = navigation.state.params;
  return (
    <View>
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="xlarge"
          containerStyle={styles.userInfoAvatar}
          source={{
            uri: photoURL
              ? photoURL
              : "https://api.adorable.io/avatars/285/abott@adorable.png",
          }}
        />
        <View>
          <Text style={styles.displayname}>{nombre ? nombre : "Anonimo"}</Text>
          <Text style={styles.displayname}>{email}</Text>
         
        </View>
      </View>
      <UserScores userInfo = {navigation.state.params}/>
    </View>
  );
}

const styles = StyleSheet.create({

  btnCloseSession: {
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  },
  viewUserInfo: {
    backgroundColor: "#f2f2f2",

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a680",
    paddingTop: 30,
    paddingBottom: 100,
  },

  displayname: {
    fontSize: 18,
    alignSelf: "center",
    color: "#EEE",
  },
  userInfoAvatar: {
    marginBottom: 20,
  },
});
