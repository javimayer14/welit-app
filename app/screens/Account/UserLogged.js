import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, Divider } from "react-native-elements";
import * as firebase from "firebase";
import InfoUser from "../../components/Account/InfoUser";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AccountOptions from "../../components/Account/AccountOption";
import UserScores from "../../components/Account/UserScores";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState({});
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textLoading, setTextLoading] = useState("");
  const toastRef = useRef();

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      const userComplete = user.providerData[0];
      const x = {
        ...userComplete,
        score: {
          id: 1,
          medallaOro: 10,
          medallaPlata: 13,
          medallaBronce: 5,
          puntuacion: 0,
          rango: null,
          medallabronce: 0,
          rango: "Pluma plateada",
        },
      };

      setUserInfo(x);
    })();
    setReloadData(false);
    console.log("USER LOGUED LA CONCHA D EUTU");

  }, [reloadData]);

  return (
    <ScrollView style={styles.viewUserInfo}>
      <InfoUser
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        setTextLoading={setTextLoading}
      />
      <UserScores userInfo={ {
        score: {
          id: 1,
          medallaOro: 2,
          medallaPlata: 2,
          medallaBronce: 2,
          puntuacion: 0,
          rango: null,
          medallabronce: 0,
          rango: "Pluma plateada",
        }}}/>
      <AccountOptions
        userInfo={userInfo}
        setReloadData={setReloadData}
        toastRef={toastRef}
      />
      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnCloseSession}
        titleStyle={styles.btnCloseSessionText} 
        onPress={() => firebase.auth().signOut()}
      />
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
});
