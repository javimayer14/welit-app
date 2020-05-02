import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "../Modal"

const db = firebase.firestore(firebaseApp);

const WidthScreen = Dimensions.get("window").width;

export default function AddComentForm(props) {
  const [storyName, setStoryName] = useState("");
  const [storyDevelopment, setStoryDevelopment] = useState("");
  const {toastRef} = props
  const addComent = () => {
   console.log("lala")
  };
  return (
    <ScrollView>
      <AddForm
        setStoryName={setStoryName}
        setStoryDevelopment={setStoryDevelopment}
      />

      <Button
        title="Enviar"
        onPress={() => prueba(toastRef)}
        buttonStyle={styles.btnAddComent}
      />
    </ScrollView>
  );

function prueba(toastRef){
  console.log("HHH")
  toastRef.current.show("Nombre actualizado");
}
}


function AddForm(props) {
  const { setStoryName, setStoryDevelopment } = props;
  return (
    <View style={styles.viewForm}>
      <Text style={styles.titleComent}>Escribe un nuevo Capitulo</Text>

      <Input
        placeholder="Relato..."
        multiline={true}
        containerStyle={styles.textArea}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3"
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
    alignItems:"center"
  },
  input: {
    marginBottom: 10
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0
  },
  btnAddComent: {
    backgroundColor: "#00a680",
    margin: 20
  },
  titleComent:{
    fontSize: 20,
    marginBottom: 10,
    alignContent:"center",
    fontWeight: "bold"
  }
});
