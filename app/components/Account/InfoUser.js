import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    userInfo: { uid, displayName, email, photoURL },
    setReloadData,
    toastRef,
    setIsLoading,
    setTextLoading,
  } = props;

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show("Has cerrado la galeria");
      } else {
        uploadImage(result.uri, uid).then(() => {
          console.log("Imagen subida correctamente");
          updatePhotoUrl(uid);
        });
      }
    }
  };
  const uploadImage = async (uri, nameImage) => {
    setTextLoading("Actualizando imagen");
    setIsLoading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`avatar/${nameImage}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = (uid) => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
        setIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show("Error");
      });
    console.log("Imagen subida correctamente");
  };
  return (
    <View>
      <View style={styles.viewUserInfo}>
        <Avatar
          rounded
          size="xlarge"
          showEditButton
          onEditPress={changeAvatar}
          containerStyle={styles.userInfoAvatar}
          source={{
            uri: photoURL
              ? photoURL
              : "https://api.adorable.io/avatars/285/abott@adorable.png",
          }}
        />

        <View>
          <Text style={styles.displayname}>
            {displayName ? displayName : "Anonimo"}
          </Text>
          <Text style={styles.displayname}>{email}</Text>
        </View>
      </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a680",
    paddingTop: 30,
    paddingBottom: 100,
  },
  userInfoAvatar: {
    marginBottom: 20,
  },
  displayname: {
    fontSize: 18,
    alignSelf: "center",
    color: "#EEE",
  },
  cardStyle: {
    marginTop:300,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
  },
});
