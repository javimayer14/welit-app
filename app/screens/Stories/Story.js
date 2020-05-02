import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Button, Icon, Divider, Tooltip } from "react-native-elements";
import * as firebase from "firebase";
import Carousel from "../../components/Carousel";
import ActionButton from "react-native-action-button";
import AddComentForm from "../../components/Coments/AddComentForm";
import Modal from "../../components/Modal";
import ConfettiCannon from "react-native-confetti-cannon";
import Toast from "react-native-easy-toast";
import UserVisited from "../UserVisited";
import NotLogin from "../../components/NotLogin";

const screenWidth = Dimensions.get("window").width;

export default function Story(props) {
  const [imageStory, setImageStory] = useState("");
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isVisibleModalLogin, setIsVisibleModalLogin] = useState(false);

  const [user, setUser] = useState(null);
  const { navigation } = props;
  const { story } = navigation.state.params;
  const toastRef = useRef();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
    urlStoryImage("piramides.jpg");
  }, []);

  const urlStoryImage = (uid) => {
    firebase
      .storage()
      .ref(`storyImages/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        console.log(update.photoURL + "BIEN");
        setImageStory(update);
      })
      .catch(() => {
        toastRef.current.show("Error");
      });
  };

  return (
    <View>


    <ScrollView centerContent={true}>
      
      <View style={styles.viewImage}>
        <Image
          source={{
            uri: story.imagen
              ? story.imagen
              : "https://api.adorable.io/avatars/285/abott@adorable.png",
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.viewBody}>
        <View style={styles.viewMg}>
          <Text style={styles.title}>{story.titulo}</Text>
          {story.activo == 0 ? (
            <Button
              icon={
                <Icon
                  type="material-community"
                  name="heart"
                  color="#00a680"
                  size={30}
                />
              }
              buttonStyle={styles.btnView}
              containerStyle={styles.btnContainer}
              title={story.mg.toString()}
              type="outline"
              onPress={() => incrementLike()}
            />
          ) : null}
        </View>

        <View style={styles.iconsTitle}>
          <Tooltip backgroundColor={"#00a680"} popover={<Text>Capitulos: 8 de 12</Text>}>
            <View style={{flexDirection:"row"}}>
              <Icon
                type="material-community"
                name="star"
                color="#FFCF56"
                size={30}
              />
              <Text style={styles.iconsTitleNumber}>8/12</Text>
            </View>
          </Tooltip>
          <Tooltip  backgroundColor={"#00a680"} popover={<Text>Participando</Text>}>
            <View style={{flexDirection:"row"}}>
            <Icon
            type="material-community"
            name="account"
            color="#00a680"
            size={30}
          />
          <Text style={styles.iconsTitleNumber}>14</Text>
            </View>
          </Tooltip>

         
        </View>
        <Divider />
        {story.comentarios.map((comentario, index) =>
          comentario.ganador == 1 ? (
            <View key={index}>
              <Text
                style={styles.tituloAutor}
                onPress={() => userVisited(comentario.usuario)}
              >
                Capitulo {comentario.capitulo ? comentario.capitulo : null } por:
                <Text style={styles.nombreAutor}>
                  {" "}
                  {comentario.usuario.nombre}{" "}
                </Text>
              </Text>
              <Text style={styles.comentarioGanador}>
                {comentario.comentario}
              </Text>
            </View>
          ) : null
        )}
        {story.activo == 0 ? null : (
          <View style={styles.viewComentariosActivos}>
            <Divider />

            <Text style={styles.titleComentariosParticipando}>
              Capitulos participando
            </Text>
            <Carousel
              arrayComents={story.comentarios}
              width={screenWidth}
              height={200}
              user={user}
              setIsVisibleModalLogin={setIsVisibleModalLogin}
            />
          </View>
        )}
      </View>
      <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
        <AddComentForm toastRef={toastRef} />
      </Modal>
      <Modal
        isVisible={isVisibleModalLogin}
        setIsVisible={setIsVisibleModalLogin}
      >
        <NotLogin
          navigation={navigation}
          setIsVisibleModalLogin={setIsVisibleModalLogin}
        />
      </Modal>
      <Toast
        ref={toastRef}
        position="top"
        fadeOutDuration={5000}
        fadeInDuration={2000}
        style={styles.toastStyle}
      />
    </ScrollView>
    {story.activo == 1 ? <AddCommentButton navigation={navigation} /> : null}
    
    </View>
  );

  function AddCommentButton(props) {
    const { navigation } = props;
    return (
      <ActionButton
        buttonColor="#00a680"
        position="right"
        verticalOrientation="up"
        onPress={() => addComentForm()}
      />
    );
  }
  function addComentForm() {
    if (user) {
      setIsVisibleModal(true);
    } else {
      setIsVisibleModalLogin(true);
    }
  }
  function incrementLike() {}

  function userVisited(userVisited) {
    if (user) {
      navigation.navigate("UserVisited", userVisited);
    } else {
      setIsVisibleModalLogin(true);
      console.log("NO");
    }
  }
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 200,
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 5,
  },
  tituloAutor: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
  },
  nombreAutor: {
    color: "#00a680",
  },
  comentarioGanador: {
    fontSize: 23,
  },
  description: {
    fontSize: 23,
  },
  viewImage: {
    width: "100%",
    backgroundColor: "#BBBBBB",
    marginBottom: 20,
  },
  btnView: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 10,
  },
  btnContainer: {
    alignItems: "flex-end",
    marginLeft: 20,
  },
  viewMg: {
    flexDirection: "row",
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  toastStyle: {
    backgroundColor: "#00a680",
    height: 100,
    width: "100%",
    alignItems: "center",
  },
  viewComentariosActivos: {
    marginTop: 15,
  },
  titleComentariosParticipando: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  iconsTitle: {
    flexDirection: "row",
    marginBottom: 10,
  },
  iconsTitleNumber: {
    fontSize: 25,
    marginRight: 10,
  },
});
