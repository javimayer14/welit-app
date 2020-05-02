import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { InfoUserVisited } from "../components/InfoUserVisited";
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
          <Text style={styles.displayname}>Likes totales: 5</Text>
        </View>
      </View>
      <UserScores userInfo = {navigation.state.params}/>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 10,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 200,
  },
});
