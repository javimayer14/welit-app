import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, Divider, Header } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOption";
import UserScores from "../../components/Account/UserScores";
import  * as URLs from "../../../assets/constants/fetchs"

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
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
  }, [reloadData]);

  const ScoreSearch = () => {
      return (
        <View style={styles.viewScoreSearch}>
          <Text>
            Obteniendo puntuación 
          </Text>
        </View>
      )
  }

  return (
    <ScrollView style={styles.viewUserInfo}>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <View>
      {userInfo.score ? <UserScores userInfo={userInfo} /> : <Text>NO</Text>}
      </View>
 
      <View style={styles.prueba}>
      {/* <AccountOptions
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
        /> */}
      </View>
      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading text={textLoading} isVisible={isLoading} />
    </ScrollView>
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
  prueba:{
    marginTop:100
  },
  viewScoreSearch:{
   alignSelf:"center",
   alignItems: "center"
  }

});
