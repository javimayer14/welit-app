import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const WidthScreen = Dimensions.get("window").width;

export default function AddStoryForm(props) {
  const [imagesSelected, SetImageSelected] = useState([]);
  const [storyName, setStoryName] = useState("");
  const [storyDevelopment, setStoryDevelopment] = useState("");
  const { navigation, setIsLoading } = props;

  const addStory = () => {
    if (!storyName || !storyDevelopment) {
      console.log("Todos los campos deben ser completados");
    } else if (imagesSelected.length === 0) {
      console.log("La historia debe tener una foto");
    } else {
      uploadImageStorage(imagesSelected);
    }
  };
  return (
    <ScrollView>
      <ImageStory imageStory={imagesSelected[0]} />
      <AddForm
        setStoryName={setStoryName}
        setStoryDevelopment={setStoryDevelopment}
      />
      <UploadImage
        imagesSelected={imagesSelected}
        SetImageSelected={SetImageSelected}
      />
      <Button
        title="Enviar"
        onPress={() => addStory()}
        buttonStyle={styles.btnAddStory}
      />
    </ScrollView>
  );
}
const uploadImageStorage = async imageArray => {
  const imageBlob = [];
  await Promise.all(
    imageArray.map(async image => {
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase
        .storage()
        .ref("storyImages")
        .child("aas");

      await ref.put(blob).then(result => {
        imageBlob.push(result.metadata.name);
        console.log(result);
      });
    })
  );
  return imageBlob;
};

function ImageStory(props) {
  const { imageStory } = props;
  return (
    <View style={styles.viewPhoto}>
      {imageStory ? (
        <Image
          source={{ uri: imageStory }}
          style={{ width: WidthScreen, height: 200 }}
        />
      ) : (
        <Image
          source={require("../../../assets/img/user-guest.jpg")}
          style={{ width: WidthScreen, height: 200 }}
        />
      )}
    </View>
  );
}

function UploadImage(props) {
  const { imagesSelected, SetImageSelected } = props;

  const imageSelected = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionsCamera =
      resultPermissions.permissions.cameraRoll.status;
    if (resultPermissionsCamera === "denied") {
      console.log("Es nnecesario aceptar permisos");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      if (result.cancelled) {
        console.log("Has cerrado galeria");
      } else {
        SetImageSelected([...imagesSelected, result.uri]);
      }
    }
    console.log("LALAL" + imagesSelected);
  };

  const removeImage = image => {
    const arrayImages = imagesSelected;

    Alert.alert(
      "Eliminar imagen",
      "Estas seguro que quieres eliminar la imagen ?",
      [
        ({
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          onPress: () =>
            SetImageSelected(arrayImages.filter(imageUrl => imageUrl !== image))
        })
      ]
    );
  };

  return (
    <View style={styles.viewImage}>
      {imagesSelected.length < 5 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.icon}
          onPress={imageSelected}
        />
      )}

      {imagesSelected.map(image => (
        <Avatar
          key={image}
          onPress={() => removeImage(image)}
          style={styles.miniatureStyle}
          source={{ uri: image }}
        />
      ))}
    </View>
  );
}

function AddForm(props) {
  const { setStoryName, setStoryDevelopment } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="nombre de la historia"
        containerStyle={styles.input}
        onChange={e => setStoryName(e.nativeEvent.text)}
      />
      <Input
        placeholder="historia"
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
    marginRight: 10
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
  btnAddStory: {
    backgroundColor: "#00a680",
    margin: 20
  }
});
