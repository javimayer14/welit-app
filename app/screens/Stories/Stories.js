import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { Card, ListItem, Button, Icon, Image } from "react-native-elements";
import ActionButton from "react-native-action-button";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import Toast from "react-native-easy-toast";
import CountDown from "react-native-countdown-component";
import ContDownCustom from "../../components/ContDown";
import Modal from "../../components/Modal";
import * as URLs from "../../../assets/constants/fetchs";

export default function Restaurant(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [segundosRestates, setSegundos] = useState(null);
  const [storiess, setStories] = useState([]);
  const [isVisibleModalLoadig, setIsVisibleModalLoadig] = useState(false);
  const [render, setRender] = useState(null);
  const [segRest, setSegRest] = useState();
  const [isVisibleModalComent, setIsVisibleModalComent] = useState(false);

  const toastRef = useRef();

  useEffect(() => {
    setIsVisibleModalLoadig(true);
    setSegRest(40);

    async function fire() {
      let a = await firebase.auth().onAuthStateChanged((userInfo) => {
        console.log("USERINFO", userInfo);
        setUser(userInfo);
      });
    }

    async function findHistoriasActivas() {
      return await fetch(`${URLs.HEROKU_URL}/api/historiasActivas`)
        .then((response) => response.json())
        .then((json) => {
          setStories(json);
          return json;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    fire();
    findHistoriasActivas();
    setIsVisibleModalLoadig(false);
    console.log(storiess)
  }, [render]);

  const showAlert = () => {
    Alert.alert("You need to...");
  };
  return (
    <ScrollView style={styles.viewBody}>
      <View style={{ alignItems: "center" }}>
        <ContDownCustom
          showAlert={showAlert}
          timeFinish={{ FinishHour: 17, FinishMinutes: 0 }}
          setRender={setRender}
          onFinish={() => alert("Finished")}
        />
      </View>

      <Loading isVisible={isVisibleModalLoadig} text="Guardando" />
      <Toast
        ref={toastRef}
        position="top"
        fadeOutDuration={5000}
        fadeInDuration={2000}
      />

      {storiess.map((story, index) => (
        
        <Card
          key={index}
          image={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/welit-adfb8.appspot.com/o/Imagenes%2FHistorias%2Fcuadro.jpg?alt=media&token=4339cb22-e579-4235-9b8d-10256e5e44b3",
          }}
          containerStyle={styles.bodyCard}
          imageStyle={styles.imageCard}
        >
          <Text style={styles.titleCard}>{story.titulo}</Text>
          <Text style={styles.textCard}>{story.relato.substr(0, 90)}...</Text>

          <Button
            icon={
              <Icon
                type="material-community"
                name="eye-outline"
                color="#ffffff"
                iconStyle={styles.iconButton}
              />
            }
            buttonStyle={styles.btnView}
            title="Ver historia"
            onPress={() =>
              navigation.navigate("Story", {
                story,
                setRender,
                setIsVisibleModalComent,
                toastRef,
              })
            }
          />
          <Toast
            ref={toastRef}
            position="top"
            fadeOutDuration={5000}
            fadeInDuration={2000}
          />
        </Card>
      ))}

      {user && <AddStoryButton navigation={navigation} />}

      <Modal
        isVisible={isVisibleModalComent}
        setIsVisible={setIsVisibleModalComent}
      >
        <ComentSuccess />
      </Modal>
    </ScrollView>
  );
}

function AddStoryButton(props) {
  const { navigation } = props;
  return (
    <ActionButton
      buttonColor="#00a680"
      onPress={() => navigation.navigate("AddStory")}
    />
  );
}
function ComentSuccess() {
  return (
    <View style={styles.comentSuccessView}>
      <Icon
        type="material-community"
        name="checkbox-marked-circle-outline"
        color="#ffffff"
        iconStyle={styles.iconCheck}
      />

      <Text style={styles.comentSuccessText}>
        El relato fué cargado con éxito
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
  },
  btnView: {
    backgroundColor: "#00a680",
    borderRadius: 0,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 0,
  },
  imageCard: {
    height: 100,
    marginLeft: 20,
    marginRight: 20,
  },
  bodyCard: {
    margin: 20,
    padding: 0,
  },
  textCard: { 
    marginTop: 5,
    marginBottom:10,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    textAlign:"justify"
   },
  titleCard: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    textAlign:"justify"

  },
  iconButton: {
    marginRight: 5,
  },
  comentSuccessView: {
    backgroundColor: "#00a680",
    borderRadius: 5,
    alignItems: "center",
  },
  comentSuccessText: {
    fontSize: 25,
    color: "#fff",
    marginRight: 20,
    marginLeft: 20,
    textAlign: "center",
  },
  iconCheck: {
    fontSize: 100,
  },
  iconClose: {
    position: "absolute",
    top: "100%",
  },
});
