import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  Text,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import Modal from "../Modal";
import  * as URLs from "../../../assets/constants/fetchs"


const db = firebase.firestore(firebaseApp);

const WidthScreen = Dimensions.get("window").width;

export default function AddComentForm(props) {
  const [storyName, setStoryName] = useState("");
  const [storyDevelopment, setStoryDevelopment] = useState("");
  const { setIsVisibleModalComent, setIsVisibleModalLoadig, setIsVisibleModal, story, user, navigation, setRender } = props;
  const addComent = () => {
    console.log("lala");
  };

  const obtenerCapitulo = () => {
    let ultimoCapitulo = story.comentarios
    .filter(com => com.ganador === 1);
    return ultimoCapitulo[ultimoCapitulo.length -1].capitulo

  }
  const  prueba = async() => {
    setIsVisibleModalLoadig(true);
    const ultimoCapitulo = obtenerCapitulo();
    await fetch(`${URLs.HEROKU_URL}/api/comentarios`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comentario: storyDevelopment,
        mg: 0,
        historia: {
          id: story.id
        },
        capitulo: ultimoCapitulo +1,
        participando: 1,
        usuario: {
          id: user.uid
        },
        createAt: Date.now(),
        ganador: 0
      
      }),
    }) /*.then((response) => response.json())
    .then((json) => {
      console.log(json);
    })*/
    .catch((error) => {
      console.error(error);
    });;
    let render = 1
    setRender(render)
    setIsVisibleModalComent(true)
    navigation.navigate("Stories",{ render});
 


  }


  return (
    <ScrollView>
      <AddForm
        setStoryName={setStoryName}
        setStoryDevelopment={setStoryDevelopment}
      />

      <Button
        title="Enviar"
        onPress={() => prueba()}
        buttonStyle={styles.btnAddComent}
      />
    </ScrollView>
  );

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
        onChange={e => setStoryDevelopment(e.nativeEvent.text)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  viewImage: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  viewForm: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
  },
  input: {
    marginBottom: 10,
  },   
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddComent: {
    backgroundColor: "#00a680",
    margin: 20,
  },
  titleComent: {
    fontSize: 20,
    marginBottom: 10,
    alignContent: "center",
    fontWeight: "bold",
  },
});
