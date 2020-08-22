import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet,Text } from "react-native";
import { Button } from "react-native-elements";
import AccountOptions from "../../components/Account/AccountOption";
import Toast from "react-native-easy-toast";
import  * as URLs from "../../../assets/constants/fetchs"

import * as firebase from "firebase";

export default function () {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const toastRef = useRef();

  const terminarRonda = () => {
    return fetch(`${URLs.HEROKU_URL}/api/historiasPrueba`)
      .then((response) => response.json())
      .then((json) => {
        console.log("TERMINAR RONDA");
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user){
      const userData = user.providerData[0];
      setUserInfo(userData);
      function findUserLoged() {
        return fetch(`${URLs.HEROKU_URL}/api/usuario/${user.uid}`)
          .then((response) => response.json())
          .then((json) => {
            setUserInfo({ ...userData, ...json });
            return json;
          })
          .catch((error) => {
            console.error(error);
          });
      }
      findUserLoged();
      setReloadData(false);

    }
  }, [reloadData]);

  return (
    //userInfo.displayName ? 
    <View>
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Button
        title="Terminar ronda"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => terminarRonda()}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.5} />
    </View>// : <View><Text>Crea tu cuenta para poder configurar</Text></View>
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
});
